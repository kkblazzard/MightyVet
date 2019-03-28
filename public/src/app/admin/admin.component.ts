import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PartnersService } from '../http_services/partners.service';
import { UsersService } from '../http_services/users.service';
import { WebinarsService } from '../http_services/webinars.service';
import { SpeakersService } from '../http_services/speakers.service'
import { ComponentFixtureNoNgZone } from '@angular/core/testing';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  view: String = "";
  newPartner: any = {tier: 1, partner: {name: "", img: "", link: ""}};
  partners: any;
  newWebinar: any = {title: "", description: "", speaker: "", video_link: "", quiz: []}
  webinars: any;
  speakers: any;
  newSpeaker: any = {title: "Dr.", firstName: "", lastName: "", description: "", img: "", webinars: []}
  users: any;
  constructor(
    private _partnersService: PartnersService,
    private _usersService: UsersService,
    private _webinarsService: WebinarsService,
    private _speakersService: SpeakersService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }
  ngOnInit() {
    this.getPartners();
    this.getUsers();
    this.getWebinars();
    this.getSpeakers();
  } 
  getPartners(){
    let obs = this._partnersService.getPartners();
    obs.subscribe(data=>this.partners=data)}
  addPartner(){
    let obs = this._partnersService.addPartner(this.newPartner);
    obs.subscribe(data=>{
      console.log(data);
      this.getPartners();
      this.newPartner= {tier: 1, partner: {name: "", img: "", link: ""}};
    });
  }
  getUsers(){
    let obs = this._usersService.getUsers();
    obs.subscribe(data => this.users=data)}
  getWebinars(){
    let obs = this._webinarsService.getWebinars();
    obs.subscribe(data => this.webinars=data)}
  addWebinar(){
    // let obs = this._speakersService.getSpeaker(this.newWebinar.speaker);
    // obs.subscribe(data => {
    //   console.log(data);
    //   this.newWebinar.speaker = data;
      let obs = this._webinarsService.addWebinar(this.newWebinar);
      obs.subscribe(data =>{
        console.log(data);
        this.getWebinars();
        this.newWebinar = this.newWebinar = {title: "", description: "", speaker: "", video_link: "", quiz: []};
      })
    // })
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
  viewPartners(){
    this.view = "partners";
  }
  viewWebinars(){
    this.view = "webinars";
  }
  viewUsers(){
    this.view = "users";
  }
}
