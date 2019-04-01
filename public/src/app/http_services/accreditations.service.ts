import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class AccreditationsService {

  constructor(private _http : HttpClient) { }
  getAccreditations(){ 
    return this._http.get(`/api/accreditations`);
  }
  addAccreditation(newAccreditation) {
    console.log("http.service addaccreditation", newAccreditation);
    return this._http.post('/api/accreditations', newAccreditation);
  }
  accreditationUpdate(id, accreditationUpdate) {
    console.log("http.service accreditationupdate", accreditationUpdate);
    return this._http.put('/api/accreditations/' + id, accreditationUpdate);
  }
  deleteAccreditation(id) {
    return this._http.delete('/api/accreditations/' + id);
  }
}
