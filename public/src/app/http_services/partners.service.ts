import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {

  constructor(private _http: HttpClient) { }
  getPartners(){ 
    return this._http.get(`/api/partners`);
  }
  addPartner(newpartner) {
    console.log("http.service addpartner", newpartner);
    return this._http.post('/api/partners', newpartner);
  }
  partnerUpdate(id, partnerUpdate) {
    console.log("http.service partnerupdate", partnerUpdate);
    return this._http.put('/api/partners/' + id, partnerUpdate);
  }
  deletePartner(id) {
    return this._http.delete('/api/partners/' + id);
  }
}
