import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MentorsService } from '../http_services/mentors.service';
import { EventsService } from '../http_services/events.service';
import { AuthenticationService } from '../http_services/authentication.service';
import { MenteesService } from '../http_services/mentees.service';

@Component({
  selector: 'app-mentor-details',
  templateUrl: './mentor-details.component.html',
  styleUrls: ['./mentor-details.component.css']
})
export class MentorDetailsComponent implements OnInit {
  id: string;
  mentor: any;
  isMentee: boolean;
  application: boolean;
  constructor(
    private _route: ActivatedRoute,
    private _mentorsService: MentorsService,
    private _eventsService: EventsService,
    private _authenticationsService: AuthenticationService,
    private _menteesService: MenteesService,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.application = false;
    this.isMentee = false;
    this._route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.getMentor();
    }),
      (err) => {
        console.log(err);
      }
  }
  getMentor() {
    let obs = this._mentorsService.getMentor(this.id);
    obs.subscribe((data) => {
      console.log(data);
      this.mentor = data;
      if (data['mentees']){
        this.checkMentee();
      } 
    }),
    (err) => {
        console.log(err);
      }
  }
  checkMentee() {
    for (let mentee of this.mentor.mentees) {
      if (mentee.user === this._authenticationsService.getUserDetails()._id) {
        if (!mentee.approval){
          this.application = true;
        }
        else{
          this.isMentee = true;
        }
      }
    }
  }
  signUp() {
    if (!this._authenticationsService.isLoggedIn()) {
      this._eventsService.sendLogin();
    } else {
      let obs = this._menteesService.addMentee({ user: this._authenticationsService.getUserDetails()._id, mentor: this.id });
      obs.subscribe(data => {
        console.log('successfully created new mentee', data);
        let obs2 = this._mentorsService.signUp(this.id, data);
        obs2.subscribe(data2 => {
          console.log('successfully added new mentee to mentor', data2);
          this.isMentee = true;
        },
          err => {
            console.log('something went wrong:', err);
          });
      }), err => {
        console.log('something went wrong:', err);
      }
    }
  }
}
