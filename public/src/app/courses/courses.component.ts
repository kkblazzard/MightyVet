import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WebinarsService } from '../http_services/webinars.service';

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
        management: false,
        communication: false,
        medical: false,
        technical: false
      }
    }
  }
  getAllCourses() {
    this._webinarsService.searchWebinars()
    .subscribe(courses => {
      console.log('received all courses', courses);
      this.allCourses = courses;
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
