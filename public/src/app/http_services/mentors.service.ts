import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class MentorsService {

  constructor(
    private _http: HttpClient
  ) { }
  getMentors(){ 
    console.log("http.service getting all mentors")
    return this._http.get(`/api/mentors`);
  }
  getApprovals(){
    console.log("http.service getting mentors seeking approval")
    return this._http.get(`/api/mentors/approvals`)
  }
  addmentor(newMentor) {
    console.log("http.service addmentor", newMentor);
    return this._http.post('/api/mentors', newMentor);
  }
  mentorUpdate(id, mentorUpdate) {
    console.log("http.service mentorupdate", mentorUpdate);
    return this._http.put('/api/mentors/' + id, mentorUpdate);
  }
  approveMentor(id){
    console.log("http.service approving mentor");
    return this._http.put('/api/mentors/' + id, {set: {approval: true}});
  }
  declineMentee(id, mentee_id){
    console.log("http.service decline mentee");
    return this._http.put('/api/mentors/decline_mentee'+id, {mentee_id: mentee_id})
  }
  approveMentee(id){
    console.log("http.service approving mentee");
    return this._http.put('/api/mentors/approve_mentee'+id, {})
  }
  deleteMentor(id) {
    return this._http.delete('/api/mentors/' + id);
  }
}
