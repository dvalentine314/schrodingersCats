# Save Schrodinger's Cats

## introduction
There exists in many Angular applications a common anti-pattern that causes race conditions in our code. observe the following:

```Typescript
alive: boolean;
catStatus: Observable<anu>;
ngOnInit():void{

  this.catStatus.subscribe(x=>this.alive = x);

  if(this.alive){
    //do more stuff
  }
}

```
```html
<div>{{alive}}</div>
```

Ok, so we have an observable that emits a value which we set in `alive`. we then show `alive` on the UI. no big deal. but what about the `if` statement? Uh oh, the if statement would  not behave as intended because `alive` wont be set until `this.catStatus` emits its value. this results in a race condition. now we need to guess or check that the observable has emitted before we run our if statement.`setTimeout()` or `isCompleted` are two options but it can all get pretty gross.

## a better way

But we need the value....

Observables were designed to handle outputs returning at unpredictable times. The problem is that we pulled the value out of the obserable in order to work with it. What if we didn't have to. what if we kept our observables in their box but could peak at the value without exposing the box to the outside world. what if we could keep Shrodingers cat alive (and dead) by keeping him in the box?



## principles

- keep observables in streams by using Subjects 
- simplify nested subscriptions by multicasting observable results using subjects
- use the angular Async pipe to display the most current value of a subject
- handle user C.R.U.D. of server data by loading Subject value into Angular Forms using the async pipe.
- use `observable.subscribe(subject);` to easily drop observables into subjects
- 


