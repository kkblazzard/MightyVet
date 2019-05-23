import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WebinarsService } from '../http_services/webinars.service';
import { EventsService } from '../http_services/events.service';
import { AuthenticationService } from '../http_services/authentication.service';
import { AccreditationsService } from '../http_services/accreditations.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  id: string;
  course: any;
  isSignedUp: boolean;
  isLive: boolean;
  showSpeaker: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _webinarsService: WebinarsService,
    private _eventsService: EventsService,
    private _authenticationsService: AuthenticationService,
    private _accreditationsService: AccreditationsService,
    private _router: Router,
    ) { }

  ngOnInit() {
    this.isSignedUp = false;
    this._route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.getWebinar();
    }),
    (err) => {
      console.log(err);
    }
  }
  getWebinar(){
    let obs = this._webinarsService.getWebinar(this.id);
    obs.subscribe((data)=>{
      this.course = data;
      if (this.course.users){
        this.checkSignUp();
      }
    }),
    (err)=>{
      console.log(err);
    }
  }
  checkSignUp(){
    for(let user of this.course.users){
      if(user.user == this._authenticationsService.getUserDetails()._id){
        this.isSignedUp = true;
      }
    }
  }
  signUp(){
    if (!this._authenticationsService.isLoggedIn()){
      this._eventsService.sendLogin();
    }
    else{
      let obs = this._accreditationsService.addAccreditation({user: this._authenticationsService.getUserDetails()._id, webinar: this.id})
      obs.subscribe(data => {
        let obs2 = this._webinarsService.signUp(this.id, data['_id'], this._authenticationsService.getUserDetails()._id);
        obs2.subscribe(data2 => {
          this.getWebinar();
        },
        err =>{
          console.log("something went wrong:", err);
        })
      }), err => {
        console.log("something went wrong:", err);
      }
    }
  }

  toggle() {
    this.showSpeaker = !this.showSpeaker;
  }
}
