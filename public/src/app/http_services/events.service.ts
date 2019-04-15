import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  public login: Subject<any> = new Subject<any>();
  public signup: Subject<any> = new Subject<any>();
  public donate: Subject<any> = new Subject<any>();
  public paymentSuccess: Subject<any> = new Subject<any>();

  constructor() { }
  sendLogin(){
    this.login.next();
  }
  sendSignup(){
    this.signup.next();
  }
  sendDonate(){
    this.donate.next();
  }
  sendPaymentSuccess(){
    this.paymentSuccess.next();
  }
  openLogin(): Observable<any> {
    return this.login.asObservable();
  }
  openSignup(): Observable<any>{
    return this.signup.asObservable();
  }
  openDonate(): Observable<any>{
    return this.donate.asObservable();
  }
  openPaymentSuccess(): Observable<any>{
    return this.paymentSuccess.asObservable();
  }
}

