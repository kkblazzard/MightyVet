import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WebinarsService } from '../http_services/webinars.service';
import * as moment from 'moment';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _webinarsService: WebinarsService
  ) { }

  allCourses: any;
  // featuredNumber: number;
  // titleSearch: any;
  // searchError: any;
  searchBar: any;

  ngOnInit() {
    this.getAllCourses();
    // this.featuredNumber = 6;
    this.searchBar = {
      featuredNumber: 6,
      bar: "",
      type: {
        Live: false,
        Video: false
      } ,
      category: {
        business: false,
        communication: false,
        mental_health: false,
        well_being: false,
        university_life: false,
        career_path: false
      }
    }
  }
  getAllCourses() {
    this._webinarsService.searchWebinars()
    .subscribe(courses => {
      this.allCourses = courses;
      this.allCourses.map(x => {
        x.new = moment(x.createdAt).isSameOrAfter(moment().subtract(14, 'days'));
      });
    });
  }

  clickLive(){
    if(this.searchBar.type.Video){
      this.searchBar.type.Video = false;
    }
  }
  clickVideo(){
    if(this.searchBar.type.Live){
      this.searchBar.type.Live = false;
    }
  }
  seeMore(){
    this.searchBar.featuredNumber += 6;
  }

}
