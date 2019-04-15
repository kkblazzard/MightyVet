import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ExcelsService {

  constructor(private _http: HttpClient) { }
  
  userExcels(){
    return this._http.get("/api/excels/users");
  }
}
