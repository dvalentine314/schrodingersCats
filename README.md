# Save Schrodinger's Cats

## problems

 - race conditions on observable responses
 - complex nested subscriptions with uncontrolled side effects

## principles

- keep observables in streams by using Subjects 
- simplify nested subscriptions by multicasting observable results using subjects
- use the angular Async pipe to display the most current value of a subject
- handle user C.R.U.D. of server data by loading Subject value into Angular Forms using the async pipe.
- use `observable.subscribe(subject);` to easily drop observables into subjects
- 


