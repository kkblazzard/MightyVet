import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
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

  constructor() { }

  ngOnInit() {
  }
}
