import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MeetingsService } from '../http_services/meetings.service';
import { MentorsService } from '../http_services/mentors.service';
import { AuthenticationService } from '../http_services/authentication.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import * as _ from 'lodash';

export interface CalendarDate {
  mDate: moment.Moment;
  selected?: boolean;
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
  dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  weeks: CalendarDate[][] = [];
  sortedDates: CalendarDate[] = [];
  @Input() selectedDates: CalendarDate[] = [];
  @Output() onSelectDate = new EventEmitter<CalendarDate>();
  constructor(
    private _authenticationsService: AuthenticationService,
    private _mentorsService: MentorsService,
    private _meetingsService : MeetingsService,
    private _route: ActivatedRoute,
    private _router: Router) { }
  ngOnInit() {
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
      if(data['errors']){
        this._router.navigateByUrl('/mentorship/'+this.id);
      }
      else{
        this.mentor = data;
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
    return _.range(start, start + 42)
            .map((date: number): CalendarDate => {
              const d = moment(firstDayOfGrid).date(date);
              return {
                today: this.isToday(d),
                selected: this.isSelected(d),
                mDate: d,
              };
            });
  }
  isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }

  isSelected(date: moment.Moment): boolean {
    return _.findIndex(this.selectedDates, (selectedDate) => {
      return moment(date).isSame(selectedDate.mDate, 'day');
    }) > -1;
  }

  isSelectedMonth(date: moment.Moment): boolean {
    return moment(date).isSame(this.currentDate, 'month');
  }

  selectDate(date: CalendarDate): void {
    this.onSelectDate.emit(date);
  }
  prevMonth(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'months');
    this.generateCalendar();
  }
  nextMonth(): void {
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this.generateCalendar();
  }
  firstMonth(): void {
    this.currentDate = moment(this.currentDate).startOf('year');
    this.generateCalendar();
  }

  lastMonth(): void {
    this.currentDate = moment(this.currentDate).endOf('year');
    this.generateCalendar();
  }

  prevYear(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'year');
    this.generateCalendar();
  }

  nextYear(): void {
    this.currentDate = moment(this.currentDate).add(1, 'year');
    this.generateCalendar();
  }

}
