import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http: HttpClient) { }
  getUsers() {
    return this._http.get('/api/users');
  }
  excelUsers(){
    return this._http.get('/api/users/excel');
  }
  userUpdate(id, userUpdate) {
    return this._http.put('/api/users/' + id, userUpdate);
  }
  getUser(id) {
    return this._http.get(`/api/users/${id}`);
  }
  deleteUser(id) {
    return this._http.delete('/api/users/' + id);
  }
  updateImage(id, img_url){
    return this._http.put('/api/users/img/'+id, {img: img_url});
  }
}
