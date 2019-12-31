import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, zip, combineLatest, AsyncSubject, timer, BehaviorSubject, Subscription, of, throwError, concat } from 'rxjs';
import { switchMap, take, filter, delay, catchError, tap } from 'rxjs/operators';
import { WebRequestEmulatorService } from './web-request-emulator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  subscriptionReference: Subscription;
  constructor(private serverRequests: WebRequestEmulatorService) {

  }


  // this is just a thing that emits a value every couple of seconds. in a real app this might be some kind of state-manatement output or websocket
  public observable3: Observable<number> = timer(1000,2000);

  ngOnInit(): void {
    this.currentWayWeDoThings();
    this.newWayToDoThings();
  }

  ///current pattern
  public globalVar1: number;
  public globalVar2: string;
  public globalVar3: number;

  currentWayWeDoThings() {
    this.subscriptionReference = this.serverRequests.getSomething1FromServer().subscribe(a => {
      this.globalVar1 = a;
      // don't worry too much about the function `combine latest` it just emits values when either observable emits
      combineLatest(this.serverRequests.getSomething2ofSomething1FromServer(a), this.observable3).subscribe(([b, c]) => {
        this.globalVar2 = b;
        this.globalVar3 = c;
      });
    });
  }

  pressButton() {

    this.subscriptionReference = this.serverRequests.getSomething1FromServer().subscribe(a => {
      this.globalVar1 = a;
      // don't worry too much about the function `combine latest` it just emits values when either observable emits
      this.observable3.pipe(take(1)).subscribe(z => console.log(z));
    });

  }

  //end current pattern
  //new pattern
  public subject1: AsyncSubject<number> = new AsyncSubject<number>();
  public subject2: AsyncSubject<string> = new AsyncSubject<string>();
  public subject3: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public observableThatErrors: Observable<number | null>;
  public errorMessage: string;

  newWayToDoThings() {



    this.serverRequests.getSomething1FromServer().subscribe(this.subject1);





    this.subject1.pipe(
      switchMap(z => this.serverRequests.getSomething2ofSomething1FromServer(z))
    ).subscribe(this.subject2);

    this.subject1.pipe(
      switchMap(z => this.observable3)
    ).subscribe(this.subject3);

    /** instead of combining services to get a computed output you combine the
     * subjects which keeps everything cleaner and organized
     */
    zip(this.subject2, this.subject3).subscribe(() => {
      //some logic that needs both
      console.log("zip of subject1 subject2");
    });

    //error handling
    const errorObservable = concat(
      of(3).pipe(delay(1000)),
      of(4).pipe(delay(1000)),
      of(5).pipe(delay(1000)),
      of(6).pipe(delay(1000)),
      throwError(new Error('oops!')).pipe(delay(1000)));

    this.observableThatErrors = errorObservable.pipe(catchError(sadValue => { this.errorMessage = sadValue; return of(null); }));

  }

  pressButton2() {
    // don't worry too much about the function `zip` it just emits the current values of the observables.
    zip(this.subject1, this.subject3).subscribe(([z, y]) => {
      console.log(z + y);
    });
  }

  ngOnDestroy() {
    this.subscriptionReference.unsubscribe();
  }



//end new pattern

  respondToFormSubmission(formValue: string): void {
    // this might be a call to update the value in the services or something.
    console.log(formValue);
  }

}
