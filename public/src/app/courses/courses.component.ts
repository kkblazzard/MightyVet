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
  featuredNumber: number;
  titleSearch: any;
  searchError: any;

  ngOnInit() {
    this.getAllCourses();
    this.featuredNumber = 6;
  }
  getAllCourses() {
    // why is this searchWebinars, not getWebinars?
    this._webinarsService.searchWebinars()
    .subscribe(courses => {
      console.log('received all courses', courses);
      this.allCourses = courses;
    });
  }

  searchCourse(){
    this._webinarsService.findWebinar({'title':{"$regex":this.titleSearch,"$options":"i"}})
    .subscribe(course=>{
      if(course['error']){
        this.searchError=course['error'];
        console.log(this.searchError);
      }
      else{
        console.log
        this.allCourses=course;
      }
    });
  }

  seeMore(){
    this.featuredNumber += 6;
  }

  somethingChanged(){
    console.log("type checkbox");
  }
}
