import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class MenteesService {

  constructor(private _http: HttpClient) { }
  getMentees(){
    return this._http.get(`/api/mentees`);
  }
  getMentee(id){
    return this._http.get(`/api/mentees/${id}`);
  }
  addMentee(newMentee) {
    return this._http.post('/api/mentees', newMentee);
  }
  menteeUpdate(id, menteeUpdate) {
    return this._http.put('/api/mentees/' + id, menteeUpdate);
  }
  menteeApproval(mentee_id){
    return this._http.put('/api/mentees/approve', {mentee_id: mentee_id});
  }
  menteeDecline(mentor_id, mentee_id){
    return this._http.put('/api/mentees/decline/'+mentor_id, {mentee_id: mentee_id});
  }
  deleteMentee(id) {
    return this._http.delete('/api/mentees/' + id);
  }
}
