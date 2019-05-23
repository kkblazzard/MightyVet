import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class WebinarsService {

  constructor(private _http: HttpClient) { }
  // ---------------webinars--------------------

  getWebinars() {
    console.log("http.service getting webinars");
    return this._http.get(`/api/webinars`);
  }
  getFeaturedWebinars(){
    console.log("http.service getting featured webinars");
    return this._http.get(`/api/webinars/featured`);
  }
  searchWebinars(){
    console.log("http.service searching webinars");
    return this._http.get(`/api/webinars/search`);
  }
  addWebinar(newWebinar) {
    console.log("http.service addWebinar", newWebinar);
    return this._http.post('/api/webinars', newWebinar);
  }
  webinarUpdate(id, webinarUpdate) {
    console.log("http.service webinarupdate", webinarUpdate);
    return this._http.put('/api/webinars/' + id, webinarUpdate);
  }
  getWebinar(id) {
    console.log("http.service getting webinar", id);
    return this._http.get(`/api/webinars/${id}`);
  }
  signUp(course_id, accreditation_id, user_id){
    console.log("http.service signing up", accreditation_id);
    return this._http.put(`/api/webinars/signup/${course_id}`, {accreditation_id: accreditation_id, user_id: user_id});
  }
  deleteWebinar(id) {
    return this._http.delete('/api/webinars/' + id);
  }
  findWebinar(title) {
    console.log("http.service findWebinar", title);
    return this._http.post('/api/webinars/find', title);
  }
}

