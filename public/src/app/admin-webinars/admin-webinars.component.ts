import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WebinarsService } from '../http_services/webinars.service';
import { SpeakersService } from '../http_services/speakers.service';

@Component({
  selector: 'app-admin-webinars',
  templateUrl: './admin-webinars.component.html',
  styleUrls: ['./admin-webinars.component.css']
})
export class AdminWebinarsComponent implements OnInit {
  newWebinar: any = {title: "", description: "", speaker: "", video_link: "", quiz: []}
  webinars: any;
  speakers: any;
  newSpeaker: any = {title: "Dr.", firstName: "", lastName: "", description: "", img: "", webinars: []}
  constructor(
    private _webinarsService: WebinarsService,
    private _speakersService: SpeakersService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }

  ngOnInit() {
    this.getWebinars();
    this.getSpeakers();
  }

  getWebinars(){
    let obs = this._webinarsService.getWebinars();
    obs.subscribe(data => this.webinars=data)}
  addWebinar(){
    let obs = this._webinarsService.addWebinar(this.newWebinar);
    obs.subscribe(data =>{
      console.log(data);
      this.getWebinars();
      this.newWebinar = this.newWebinar = {title: "", description: "", speaker: "", video_link: "", quiz: []};
    })
  }
  getSpeakers(){
    let obs = this._speakersService.getSpeakers();
    obs.subscribe(data => this.speakers=data)}
  addSpeaker(){
    let obs = this._speakersService.addSpeaker(this.newSpeaker);
    obs.subscribe(data => {
      console.log(data);
      this.getSpeakers();
      this.newWebinar.speaker = data;
      this.newSpeaker = {title: "Dr.", firstName: "", lastName: "", description: "", img: "", webinars: []};
    })
  }
}
