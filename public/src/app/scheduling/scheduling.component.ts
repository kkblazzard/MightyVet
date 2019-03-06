import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CalendarView } from 'angular-calendar';
@Component({
  selector: 'app-scheduling',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css']
})
export class SchedulingComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  events: any;
  constructor(
    private _httpService : HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }
  ngOnInit() {
    this.events = this.getEvents(localStorage.getItem('loginId'));
    }
  isMentor(id){
    return this._httpService.getUser(id)['mentor'];
  }
  getEvents(id){
    return this._httpService.getMeetings(id, this.isMentor(id));
  }
}
