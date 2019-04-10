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
  // setting static data as example
  course = {
    title: 'Veterinary Self-Worth and the Psychology of Money',
    description: 'Recognizing and embracing your self- worth is core to your success as a veterinarian. However, many veterinary professionals find it difficult',
    link: 'https://webinar-portal.net/webinars/vmt/registration_190307.php'
  };

  ngOnInit() {
    this.getAllCourses();
    this.featuredNumber = 5;
  }
  getAllCourses() {
    this._webinarsService.searchWebinars()
    .subscribe(courses => {
      console.log('received all courses', courses);
      this.allCourses = courses;
    });
  }
  seeMore(){
    this.featuredNumber += 6;
  }
}
