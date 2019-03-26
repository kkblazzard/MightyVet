import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MeetingsService {

  constructor(private _http: HttpClient) { }
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

}
