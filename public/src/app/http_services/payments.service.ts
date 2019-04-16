import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  donorInfo
  constructor(private _http: HttpClient) { }

  makePayment(token, extraData){
    console.log("http payment service make payment");
    
    let obs= this._http.post('/api/donor/payment', token, extraData);
    obs.subscribe(payment =>{
      if (payment['errors']){
        console.log(payment['errors']);
      }
      else{

      }
    })

  }


}
