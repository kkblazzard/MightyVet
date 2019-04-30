import { Component, OnInit, OnChanges, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MeetingsService } from '../http_services/meetings.service';
import { AuthenticationService } from '../http_services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import * as _ from 'lodash';

export interface CalendarDate {
  mDate: moment.Moment;
  available?: boolean;
  today?: boolean;
  isPast?: boolean;
}
@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit, OnChanges {
  @ViewChild('showAvailabilities') availabilities: ElementRef;
  recurring = {
    boolean: false,
    num: '4'
  }
  schedule_events: any;
  update: number;
  updateTime: any;
  updateDate: any;
  update_error: string;
  availability_error: string;
  newTime: any;
  daily_meetings: any;
  modal: any;
  user: any;
  currentDate = moment();
  dayNames = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
  weeks: CalendarDate[][] = [];
  sortedDates: CalendarDate[] = [];
  date: moment.Moment;
  constructor(
    private _modalsService: NgbModal,
    private _authenticationsService: AuthenticationService,
    private _meetingsService: MeetingsService,
    private _route: ActivatedRoute,
    private _router: Router) { }
  ngOnInit() {
    this.newTime = '';
    this.getUserInfo();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedDates &&
      changes.selectedDates.currentValue &&
      changes.selectedDates.currentValue.length > 1) {
      // sort on date changes for better performance when range checking
      this.sortedDates = _.sortBy(changes.selectedDates.currentValue, (m: CalendarDate) => m.mDate.valueOf());
      this.generateCalendar();
    }
  }
  open(date: moment.Moment) {
    if (!this.isPast(date)) {
      this.date = date;
      this.daily_meetings = this.schedule_events.filter(x => moment(x.datetime).startOf('day').format() === date.format())
      this.modal = this._modalsService.open(this.availabilities);
      this.modal.result.then(() => { }, () => this.closedModal());
    }
  }
  closedModal() {
    this.availability_error = null;
    this.newTime = null;
    this.date = null;
    this.untoggle();
    this.getUserInfo();
    this.recurring = {
      boolean: false,
      num: '4'
    }
  }
  getUserInfo() {
    let obs = this._authenticationsService.profile();
    obs.subscribe((data) => {
      if (data['errors']) {
        this._router.navigateByUrl('/user');
      }
      else {
        this.user = data;
        console.log(this.user);
        if(this.user.mentor_id){
          this.schedule_events = [...this.user.mentor_id.availabilities.filter(x => moment(x.datetime).isSameOrAfter(moment().subtract(1, 'hours'))), 
          ...this.user.meetings.filter(x => moment(x.datetime).isSameOrAfter(moment().subtract(1, 'hours'))), 
          ...this.user.accreditations.map(x => x.webinar).filter(x => {
              if(x.type === "Live"){
                return moment(x.datetime).isSameOrAfter(moment());
              }
              return false;
            })
          ]
        }
        else{
          this.schedule_events = [...this.user.meetings.filter(x => moment(x.datetime).isSameOrAfter(moment().subtract(1, 'hours'))), 
          ...this.user.accreditations.map(x => x.webinar).filter(x => {
              if(x.type === "Live"){
                return moment(x.datetime).isSameOrAfter(moment());
              }
              return false;
            })
          ]
        }
        this.generateCalendar();
        if(this.date){
          this.daily_meetings = this.schedule_events.filter(x => moment(x.datetime).startOf('day').format() === this.date.format());
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
    const x = moment(currentMoment).month();
    const y = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days').add(35, 'days').month();
    return _.range(0, (x === y ? 42 : 35))
      .map((date: number): CalendarDate => {
        const d = moment(firstDayOfGrid).add(date, 'days');
        return {
          today: this.isToday(d),
          available: this.isDayAvailable(d),
          mDate: d,
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
  isPast(date: moment.Moment): boolean {
    return moment(date).isBefore(moment().startOf('day'));
  }
  isDayAvailable(date: moment.Moment): boolean {
    var meetings = this.schedule_events.filter(x => moment(x.datetime).startOf('day').format() === date.format());
    if (meetings.length) {
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
  newMeeting() {
    this.availability_error = null;
    if(this.newTime){
      if(Number.isInteger(this.newTime.hour) && Number.isInteger(this.newTime.minute)){
        var date = moment(this.date.toDate()).add(this.newTime.hour, 'hours').add(this.newTime.minute, 'minutes');
        if (date.isSameOrAfter(moment())){
          var meetings = [{datetime: date.toDate(), mentor: this.user.mentor_id._id}]
          if (this.recurring.boolean){
            for(let i = 1; i < parseInt(this.recurring.num); i ++){
              date = date.add(7, 'days')
              meetings.push({
                datetime: date.toDate(),
                mentor: this.user.mentor_id._id
              });
            }
          }
          let obs = this._meetingsService.addMeeting(this._authenticationsService.getUserDetails()._id, meetings);
          obs.subscribe(data => {
            console.log(data);
            if (data['errors']) {
              this.availability_error = data['errors'].datetime.message;
            }
            else {
              this.getUserInfo();
              this.newTime = null;
            }
          })
        }
        else{
          this.availability_error = "Please enter a future time."
        }
      }
      else{
        this.availability_error = "Please enter a valid time."
      }
    }
    else{
      this.availability_error = "Please enter a valid time."
    }
  }
  toggle(index){
    this.update_error = null;
    var date = moment(this.daily_meetings[index].datetime)
    this.updateTime = {hour: date.hour(), minute: date.minute(), second: date.second()};
    this.updateDate = {year: date.year(), month: date.month()+1, day: date.date()};
    this.update = index;
  }
  untoggle(){
    this.update_error = null;
    this.update = null;
    this.updateTime = null;
    this.updateDate = null;
  }
  updatingTime(meeting_id){
    this.update_error = null;
    if(this.updateDate && this.updateTime){
      if(Number.isInteger(this.updateDate.year) && Number.isInteger(this.updateDate.month) && Number.isInteger(this.updateDate.day) && Number.isInteger(this.updateTime.hour) && Number.isInteger(this.updateTime.minute)){
        var date = moment(this.updateDate.year.toString() + "-" + (this.updateDate.month.toString().length === 2 ? this.updateDate.month.toString() : "0" +this.updateDate.month.toString()) + "-" + (this.updateDate.day.toString().length === 2 ? this.updateDate.day.toString() : "0" + this.updateDate.day.toString())).add(this.updateTime.hour, "hours").add(this.updateTime.minute, "minutes");
        if (date.isSameOrAfter(moment())){
          let obs;
          if(this.daily_meetings[this.update].mentee){
            if(this.daily_meetings[this.update].mentee.mentor_id){
              obs = this._meetingsService.updateTime(meeting_id, {datetime: date.toDate(), mentor_user_id: this.user._id, mentee_mentor_id: this.daily_meetings[this.update].mentee.mentor_id});
            }
            else{
              obs = this._meetingsService.updateTime(meeting_id, {datetime: date.toDate(), mentor_user_id: this.user._id});
            }
          }
          else{
            obs = this._meetingsService.updateTime(meeting_id, {datetime: date.toDate(), mentor_user_id: this.user._id});
          }
          obs.subscribe(data => {
            if (data['errors']){
              this.update_error = data['errors'].datetime.message;
            }
            else{
              this.untoggle();
              this.getUserInfo();
            }
          })
        }
        else{
          this.update_error = "Please enter a future date and time."
        }
      }
      else{
        this.update_error = "Please enter a valid date and time."
      }
    }
    else{
      this.update_error = "Please enter a valid date and time."
    }
  }
  cancel(meeting_id) {
    let obs = this._meetingsService.deleteMeeting(meeting_id);
    obs.subscribe(data => {
      if (data['errors']){
        console.log(data['errors']);
      }
      else{
        this.getUserInfo();
      }
    })
  }
  unSignUp(meeting_id){
    let obs = this._meetingsService.cancel(meeting_id, {mentee: this._authenticationsService.getUserDetails()._id});
    obs.subscribe(data => {
      if (data['errors']){
        console.log(data['errors']);
      }
      else{
        this.getUserInfo();
      }
    })
  }
}
