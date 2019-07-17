import { Component, OnInit } from '@angular/core';
import { Observable, zip, forkJoin, AsyncSubject, timer, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'subjectKings';

  // pretend these are services.
  public observable1: Observable<number> = new Observable(subscriber => {
    setTimeout(() => {
      subscriber.next(1);
      subscriber.complete();
    },1000);
  });


  public observable2: Observable<string> = new Observable(subscriber => {
    setTimeout(() => {
      subscriber.next('2');
      subscriber.complete();
    },1000);
  });

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
    this.observable1.subscribe(a => {
      this.globalVar1 = a;
      // pretend a is needed to make requests to b and c
      zip(this.observable2, this.observable3).subscribe(([b, c]) => {
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
    this.observable1.subscribe(this.subject1);

    this.subject1.subscribe(z => {
      this.observable2.subscribe(this.subject2);
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
