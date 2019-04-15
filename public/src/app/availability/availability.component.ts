import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MeetingsService } from '../http_services/meetings.service';
import { UsersService } from '../http_services/users.service';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {
  date: Date;
  user: any;
  meetings: any;
  constructor(
    private _usersService: UsersService,
    private _meetingsService: MeetingsService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }

  ngOnInit() {
    this.getDate();
    this.getLoggedInUser();
    this.getMeetings();
  }
  getDate(){
    this._route.params.subscribe((params: Params) => this.date = new Date(params['date']));
  }
  getLoggedInUser(){
    let obs = this._usersService.getUser(localStorage.getItem('user_id'))
    obs.subscribe(data => this.user = data);
  }
  getMeetings(){
    let obs = this._meetingsService.getMeetings(this.user.mentor, this.date);
    obs.subscribe(data => this.meetings = data);
  }
  addMeeting(time){
    let obs = this._meetingsService.addMeeting(this.user.mentor);
    obs.subscribe(data => this.getMeetings());
  }
}
