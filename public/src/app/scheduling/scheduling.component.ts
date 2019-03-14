import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CalendarView, CalendarEvent } from 'angular-calendar';
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
  events: [CalendarEvent];
  constructor(
    private _httpService : HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }
  ngOnInit() {
    this.getEvents(localStorage.getItem('loginId')).subscribe((data)=>{
      for(var items in data){
        let event : CalendarEvent;
        event = JSON.parse(items);;
        this.events.push(event);
      }
    });
    }
  isMentor(id){
    return this._httpService.getUser(id)['mentor'];
  }
  getEvents(id){
    return this._httpService.getMeetings(id, this.isMentor(id));
  }
}
