import { Component, OnInit } from '@angular/core';
import { Observable, zip, forkJoin, AsyncSubject, timer, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { WebRequestEmulatorService } from './web-request-emulator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'subjectKings';

  constructor(private serverRequests: WebRequestEmulatorService) {

  }

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
    this.serverRequests.getSomething1FromServer().subscribe(a => {
      this.globalVar1 = a;
      // pretend a is needed to make requests to b and c
      zip(this.serverRequests.getSomething2ofSomething1FromServer(a), this.observable3).subscribe(([b, c]) => {
        this.globalVar2 = b;
        this.globalVar3 = c;
      });
    });
  }

  pressButton() {
    console.log(this.globalVar1 + this.globalVar3);
  }

  //end current pattern
  //new pattern
  public subject1: AsyncSubject<number> = new AsyncSubject<number>();
  public subject2: AsyncSubject<string>= new AsyncSubject<string>();
  public subject3: BehaviorSubject<number>= new BehaviorSubject<number>(0);

  newWayToDoThings() {
    this.serverRequests.getSomething1FromServer().subscribe(this.subject1);

    this.subject1.subscribe(z => {
      this.serverRequests.getSomething2ofSomething1FromServer(z).subscribe(this.subject2);
      this.observable3.subscribe(x => {
        this.subject3.next(x);
      });
    });
  }

  pressButton2() {
    zip(this.subject1, this.subject3).subscribe(([z, y]) => {
      console.log(z + y);
    });
  }

//end new pattern

}
