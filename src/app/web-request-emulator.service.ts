import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebRequestEmulatorService {

  constructor() { }



  getSomething1FromServer(): Observable<number> {

    // pretend this is some kind of $http service call like `/return this.$http.request(requestObject)`
    return new Observable(subscriber => {
      setTimeout(() => {
        subscriber.next(1);
        subscriber.complete();
      },1000);
    });
  }

  /** pretend this is a service that gets data based on value from the above method like getCustomer to getCustomerAddress or something */
  getSomething2ofSomething1FromServer(customerId: number): Observable<string>  {

    // pretend this is some kind of $http service call like `/return this.$http.request(requestObject)`
    return new Observable(subscriber => {
      setTimeout(() => {
        subscriber.next('2');
        subscriber.complete();
      },1000);
    });
  }
}
