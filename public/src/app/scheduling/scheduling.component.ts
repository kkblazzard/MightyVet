import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};
@Component({
  selector: 'app-scheduling',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css']
})
export class SchedulingComponent implements OnInit {
  viewDate: Date = new Date();

  events: Array<CalendarEvent<{ incrementsBadgeTotal: boolean }>> = [
    {
      title: 'Increments badge total on the day cell',
      color: colors.yellow,
      start: new Date(),
      meta: {
        incrementsBadgeTotal: true
      }
    },
    {
      title: 'Does not increment the badge total on the day cell',
      color: colors.blue,
      start: new Date(),
      meta: {
        incrementsBadgeTotal: false
      }
    }
  ];
  constructor() { }

  ngOnInit() {
  }
  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      day.badgeTotal = day.events.filter(
        event => event.meta.incrementsBadgeTotal
      ).length;
    });
  }
}
