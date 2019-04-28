import { Component, ViewChild, OnChanges, OnInit, ElementRef, SimpleChanges } from '@angular/core';
import { MeetingsService } from '../http_services/meetings.service';
import { MentorsService } from '../http_services/mentors.service';
import { AuthenticationService } from '../http_services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import * as _ from 'lodash';

export interface CalendarDate {
  mDate: moment.Moment;
  booked?: boolean;
  available?: boolean;
  today?: boolean;
  isPast?: boolean;
}
@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css']
})

export class SchedulingComponent implements OnInit, OnChanges {
  @ViewChild('showAvailabilities') availabilities: ElementRef;
  daily_meetings: any;
  modal: any;
  id: string;
  mentor: any;
  currentDate = moment();
  dayNames = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
  weeks: CalendarDate[][] = [];
  sortedDates: CalendarDate[] = [];
  date: moment.Moment;
  constructor(
    private _modalsService: NgbModal,
    private _authenticationsService: AuthenticationService,
    private _mentorsService: MentorsService,
    private _meetingsService : MeetingsService,
    private _route: ActivatedRoute,
    private _router: Router) { }
  ngOnInit() {
    this.mentor = {user: {firstName : "Mentor"}};
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
  open(date: moment.Moment){
    this.date = date;
    this.daily_meetings = this.mentor.availabilities.filter(x => moment(x.datetime).startOf('day').format() === date.format());
    if(this.daily_meetings.length){
      this.modal = this._modalsService.open(this.availabilities)
      this.modal.result.then(() => { }, () => this.closedModal());
    }
  }
  closedModal(){
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
  getMentor() {
    let obs = this._mentorsService.getMentor(this.id);
    obs.subscribe((data) => {
      if(data['errors']){
        this._router.navigateByUrl('/mentorship/'+this.id);
      }
      else{
        this.mentor = data;
        if (this.mentor['availabilities']){
          this.mentor['availabilities'] = this.mentor['availabilities'].filter(x => (!x.mentee ? true : x.mentee._id === this._authenticationsService.getUserDetails()._id) && moment(x.datetime).isSameOrAfter(moment().subtract(1, "hours")));
        }
        if(this.date){
          this.daily_meetings = this.mentor.availabilities.filter(x => moment(x.datetime).startOf('day').format() === this.date.format());
        }
        this.checkMentee();
        this.generateCalendar();
      }
    })
  }
  checkMentee() {
    var isMentee = false;
    if (this.mentor.mentees){
      for (let mentee of this.mentor.mentees) {
        if (mentee.user === this._authenticationsService.getUserDetails()._id) {
          if (mentee.approval){
            isMentee = true;
          }
        }
      }
    }
    if (!isMentee){
      this._router.navigateByUrl('/mentorship/'+this.id);
    }
  }
  signUp(meeting_id) {
    let obs = this._meetingsService.signUp(meeting_id, {mentee: this._authenticationsService.getUserDetails()._id});
    obs.subscribe(data => {
      if (data['errors']){
        console.log(data['errors']);
      }
      else{
        this.getMentor();
      }
    })
  }
  cancel(meeting_id) {
    let obs = this._meetingsService.cancel(meeting_id, {mentee: this._authenticationsService.getUserDetails()._id});
    obs.subscribe(data => {
      if (data['errors']){
        console.log(data['errors']);
      }
      else{
        this.getMentor();
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
                booked: this.isDayBooked(d),
                isPast: this.isPast(d)
              };
            });
  }
  isToday(date: moment.Moment): boolean {
    return moment().startOf('day').format() === date.format();
  }
  isSelectedMonth(date: moment.Moment): boolean {
    return moment(date).month() === moment(this.currentDate).month();
  }
  isPast(date: moment.Moment): boolean{
    return moment(date).isBefore(moment().startOf('day'))
  }
  isDayBooked(date: moment.Moment): boolean {
    var daily_meetings = this.mentor.availabilities.filter(x => moment(x.datetime).startOf('day').format() === date.format() && (!x.mentee ? false : x.mentee._id === this._authenticationsService.getUserDetails()._id));
    if(daily_meetings.length){
      return true;
    }
    return false;
  }
  isDayAvailable(date: moment.Moment): boolean {
    var daily_meetings = this.mentor.availabilities.filter(x => moment(x.datetime).startOf('day').format() === date.format() && !x.mentee);
    if(daily_meetings.length){
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
