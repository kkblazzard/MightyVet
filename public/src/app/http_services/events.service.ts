import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  public login: Subject<any> = new Subject<any>();
  public signup: Subject<any> = new Subject<any>();

  constructor() { }
  sendLogin(){
    this.login.next();
  }
  sendSignup(){
    this.signup.next();
  }
  openLogin(): Observable<any> {
    return this.login.asObservable();
  }
  openSignup(): Observable<any>{
    return this.signup.asObservable();
  }
}
