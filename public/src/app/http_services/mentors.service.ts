import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../http_services/users.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MentorsService {

  constructor(
    private _usersService: UsersService,
    private _http: HttpClient
  ) { }
  getMentors(){ 
    return this._http.get(`/api/mentors`);
  }
  getApprovals() {
    return this._http.get(`/api/mentors/approvals`);
  }
  getMentor(mentor_id){
    return this._http.get('/api/mentors/'+mentor_id);
  }
  addMentor(newMentor) {
    return this._http.post('/api/mentors', newMentor);
  }
  mentorUpdate(id, mentorUpdate) {
    return this._http.put('/api/mentors/' + id, mentorUpdate);
  }
  approveMentor(id){
    return this._http.put('/api/mentors/' + id, {$set: {approval: true}});
  }
  signUp(id: string, mentee: object){
    return this._http.put('/api/mentors/signup/'+id, mentee);
  }
  declineMentee(id, mentee_id){
    return this._http.put('/api/mentors/decline_mentee'+id, {mentee_id: mentee_id})
  }
  approveMentee(id){
    return this._http.put('/api/mentors/approve_mentee'+id, {})
  }
  deleteMentor(id) {
    return this._http.delete('/api/mentors/' + id);
  }
}
