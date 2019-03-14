import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

// -------------------log&reg-----------------------

  confirmLogin(user) {
    console.log("http.service confirmLogin", user);
    return this._http.post('/api/users/login', user);
  }
// -------------------users------------------------------
  addUser(newUser) {
    console.log("http.service addUser", newUser);
    return this._http.post('/api/users', newUser);
  }
  userUpdate(id, userUpdate) {
    console.log("http.service userupdate", userUpdate);
    return this._http.put('/api/users/' + id, userUpdate);
  }
  getUser(id) {
    console.log("http.service getting user", id);
    return this._http.get(`/api/users/${id}`);
  }

  deleteUser(id) {
    return this._http.delete('/api/users/' + id);
  }

//------------------meetings--------------------------
  getMeetings(id, bool){ //user id and isMentor
    if(bool){
      return this._http.get(`/api/meetings/mentor/${id}`);
    }
    else{
      return this._http.get(`/api/meetings/mentee/${id}`);
    }
  }
  addMeeting(newMeeting) {
    console.log("http.service addMeeting", newMeeting);
    return this._http.post('/api/meetings', newMeeting);
  }
  meetingUpdate(id, meetingUpdate) {
    console.log("http.service meetingupdate", meetingUpdate);
    return this._http.put('/api/meetings/' + id, meetingUpdate);
  }
  deleteMeeting(id) {
    return this._http.delete('/api/meetings/' + id);
  }
  
// ---------------donations--------------------
  addDonation(newDonation) {
    console.log("http.service addDonation", newDonation);
    return this._http.post('/api/donations', newDonation);
  }
  // donationUpdate(id, donationUpdate) {
  //   console.log("http.service donationupdate", donationUpdate);
  //   return this._http.put('/api/donations/' + id, donationUpdate);
  // }
  getDonation(id) {
    console.log("http.service getting donation", id);
    return this._http.get(`/api/donations/${id}`);
  }
  // deleteDonation(id) {
  //   return this._http.delete('/api/donations/' + id);
  // }

// ---------------webinars--------------------

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

  deleteWebinar(id) {
    return this._http.delete('/api/webinars/' + id);
  }
}
