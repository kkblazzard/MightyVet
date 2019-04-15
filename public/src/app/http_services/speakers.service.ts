import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpeakersService {

  constructor(private _http: HttpClient) { }
  getSpeakers() {
    console.log("http.service getting speakers");
    return this._http.get(`/api/speakers`);
  }
  addSpeaker(newSpeaker) {
    console.log("http.service addspeaker", newSpeaker);
    return this._http.post('/api/speakers', newSpeaker);
  }
  speakerUpdate(id, speakerUpdate) {
    console.log("http.service speakerupdate", speakerUpdate);
    return this._http.put('/api/speakers/' + id, speakerUpdate);
  }
  getSpeaker(id) {
    console.log("http.service getting speaker", id);
    return this._http.get(`/api/speakers/${id}`);
  }
  addWebinar(speaker_id, webinar) {
    return this._http.put('/api/speakers/addweb/'+speaker_id, webinar);
  }
  deleteSpeaker(id) {
    return this._http.delete('/api/speakers/' + id);
  }
}
