import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MeetingsService } from '../http_services/meetings.service';
import { MentorsService } from '../http_services/mentors.service';
import { AuthenticationService } from '../http_services/authentication.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import * as _ from 'lodash';
import { randomBytes } from 'crypto';

export interface CalendarDate {
  mDate: moment.Moment;
  available?: boolean;
  today?: boolean;
}
@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css']
})

export class SchedulingComponent implements OnInit, OnChanges {
  id: string;
  mentor: any;
  currentDate = moment();
  dayNames = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
  weeks: CalendarDate[][] = [];
  sortedDates: CalendarDate[] = [];
  constructor(
    private _authenticationsService: AuthenticationService,
    private _mentorsService: MentorsService,
    private _meetingsService : MeetingsService,
    private _route: ActivatedRoute,
    private _router: Router) { }
  ngOnInit() {
    this.mentor = {user: {firstName : "Mentor"}};
    this.generateCalendar();
    this._route.params.subscribe((params: Params) => {
      this.id = params.id;
      if(this._authenticationsService.isLoggedIn()){
        this.getMentor();
      }
      else{
        this._router.navigateByUrl('/mentorship/'+this.id);
      }
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedDates &&
        changes.selectedDates.currentValue &&
        changes.selectedDates.currentValue.length  > 1) {
      // sort on date changes for better performance when range checking
      this.sortedDates = _.sortBy(changes.selectedDates.currentValue, (m: CalendarDate) => m.mDate.valueOf());
      this.generateCalendar();
    }
  }
  getMentor() {
    let obs = this._mentorsService.getMentor(this.id);
    obs.subscribe((data) => {
      console.log(data);
      if(data['errors']){
        this._router.navigateByUrl('/mentorship/'+this.id);
      }
      else{
        this.mentor = data;
        if (data['availabilities']){
          data['availabilities'] = data['availabilities'].filter(x => x.mentee === null && x.datetime > new Date());
        }
        if (data['mentees']){
          this.checkMentee();
        }
      }
    })
  }
  checkMentee() {
    var isMentee = false;
    for (let mentee of this.mentor.mentees) {
      if (mentee.user === this._authenticationsService.getUserDetails()._id) {
        if (mentee.approval){
          isMentee = true;
        }
      }
    }
    if (!isMentee){
      this._router.navigateByUrl('/mentorship/'+this.id);
    }
  }
  generateCalendar(): void {
    const dates = this.fillDates(this.currentDate);
    const weeks: CalendarDate[][] = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;
  }
  fillDates(currentMoment: moment.Moment): CalendarDate[] {
    const firstOfMonth = moment(currentMoment).startOf('month').day();
    const firstDayOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days');
    const start = firstDayOfGrid.date();
    var x = moment(currentMoment).month()
    var y = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days').add(35, 'days').month();
    return _.range(0, (x === y ? 42 : 35))
            .map((date: number): CalendarDate => {
              const d = moment(firstDayOfGrid).add(date, 'days');
              return {
                today: this.isToday(d),
                available: this.isDayAvailable(d),
                mDate: d,
              };
            });
  }
  isToday(date: moment.Moment): boolean {
    return moment().startOf('day').format() === date.format();
  }
  isSelectedMonth(date: moment.Moment): boolean {
    return moment(date).month() === moment(this.currentDate).month();
  }
  isDayAvailable(date: moment.Moment): boolean {
    return true;
  }
  prevMonth(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'months');
    this.generateCalendar();
  }
  nextMonth(): void {
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this.generateCalendar();
  }
}
