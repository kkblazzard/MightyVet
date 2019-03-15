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
  events: [CalendarEvent] = [
    {
      start: new Date(),
      end: new Date(),
      mentor: "I am the mentor",
      mentee: "I am the mentee"
    }
  ]
  constructor(
    private _httpService : HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }
  ngOnInit() {
    console.log(this.events);
    this.getEvents(localStorage.getItem('loginId')).subscribe((data)=>{
      for(var items in data){
        let event : CalendarEvent;
        event = JSON.parse(items);;
        this.events.push(event);
      }
    });
    }
  isMentor(id){
    this._httpService.getUser(id).subscribe(data=>{return data['mentor']})
  }
  getEvents(id){
    return this._httpService.getMeetings(id, this.isMentor(id));
  }
}
