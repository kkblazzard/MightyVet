import { Component, OnInit, OnChanges, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MeetingsService } from '../http_services/meetings.service';
import { MentorsService } from '../http_services/mentors.service';
import { AuthenticationService } from '../http_services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import * as _ from 'lodash';

export interface CalendarDate {
  mDate: moment.Moment;
  available?: boolean;
  today?: boolean;
}
@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit, OnChanges {
  @ViewChild('showAvailabilities') availabilities: ElementRef;
  daily_meetings: any;
  modal: any;
  user: any;
  currentDate = moment();
  dayNames = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
  weeks: CalendarDate[][] = [];
  sortedDates: CalendarDate[] = [];
  date: moment.Moment;
  placeholder_meetings = [{
    mentee: null,
    datetime: new Date("April 24, 2019 3:30:00")
  },
  {
    mentee: null,
    datetime: new Date("April 24, 2019 6:00:00")
  },
  {
    mentee: null,
    datetime: new Date("April 24, 2019 23:59:00")
  }]
  constructor(
    private _modalsService: NgbModal,
    private _authenticationsService: AuthenticationService,
    private _mentorsService: MentorsService,
    private _meetingsService : MeetingsService,
    private _route: ActivatedRoute,
    private _router: Router) { }
  ngOnInit() {
    this.user;
    this.getUserInfo();
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
  open(date: moment.Moment){
    this.date = date;
    this.daily_meetings = this.user.mentor_id.availabilities.filter(x => moment(x.datetime).startOf('day').format() === date.format())
    this.modal = this._modalsService.open(this.availabilities)
    this.modal.result.then(() => { }, () => this.closedModal());
  }
  closedModal(){
    this.getUserInfo();
  }
  getUserInfo() {
    let obs = this._authenticationsService.profile();
    obs.subscribe((data) => {
      if(data['errors']){
        this._router.navigateByUrl('/user');
      }
      else{
        if(data['mentor_id']){
          this.user = data;
          this.user.mentor_id['availabilities'] = this.placeholder_meetings;
          console.log(this.user);
          this.generateCalendar();
        }
        else{
          this._router.navigateByUrl('/user');
        }
      }
    })
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
    this.daily_meetings = this.user.mentor_id.availabilities.filter(x => moment(x.datetime).startOf('day').format() === date.format());
    if(this.daily_meetings.length){
      return true;
    }
    return false;
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
