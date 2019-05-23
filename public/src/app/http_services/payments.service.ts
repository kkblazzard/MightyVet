import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private _http: HttpClient) { }

  makePayment(token, amount){
    return this._http.post('/api/doner/payment', {stripeToken: token, amount: amount})
    
  }


}
