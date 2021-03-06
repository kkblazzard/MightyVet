import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NewslettersService } from '../http_services/newsletters.service';
import { WebinarsService } from '../http_services/webinars.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  imgSrc1: String = "assets/img/home_page/courses.png";
  imgSrc2: String = "assets/img/home_page/hands.png";
  imgSrc3: String = "assets/img/home_page/resources.png";
  featuredCourses: any;
  newsletter: String = "";
  constructor(
    private _webinarsService: WebinarsService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _newslettersService: NewslettersService
  ) { }
  ngOnInit() {
    this.getFeaturedCourses();
  }
  getFeaturedCourses(){
    let obs = this._webinarsService.getFeaturedWebinars();
    obs.subscribe(data =>{
      this.featuredCourses = data;
    }, err => {
      console.log(err);
    })
  }
  submitNewsletter(){
    let obs = this._newslettersService.addNewsletter({email: this.newsletter});
    obs.subscribe(data => this.newsletter = "");
  }
}
