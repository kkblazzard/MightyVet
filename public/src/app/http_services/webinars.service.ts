import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class WebinarsService {

  constructor(private _http: HttpClient) { }
  // ---------------webinars--------------------

  getWebinars() {
    return this._http.get(`/api/webinars`);
  }
  getFeaturedWebinars(){
    return this._http.get(`/api/webinars/featured`);
  }
  searchWebinars(){
    return this._http.get(`/api/webinars/search`);
  }
  addWebinar(newWebinar) {
    return this._http.post('/api/webinars', newWebinar);
  }
  webinarUpdate(id, webinarUpdate) {
    return this._http.put('/api/webinars/' + id, webinarUpdate);
  }
  getWebinar(id) {
    return this._http.get(`/api/webinars/${id}`);
  }
  signUp(course_id, accreditation_id, user_id){
    return this._http.put(`/api/webinars/signup/${course_id}`, {accreditation_id: accreditation_id, user_id: user_id});
  }
  deleteWebinar(id) {
    return this._http.delete('/api/webinars/' + id);
  }
  findWebinar(title) {
    return this._http.post('/api/webinars/find', title);
  }
}

