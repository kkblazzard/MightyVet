import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NewslettersService } from '../http_services/newsletters.service';

@Component({
  selector: 'app-admin-newsletter',
  templateUrl: './admin-newsletter.component.html',
  styleUrls: ['./admin-newsletter.component.css']
})
export class AdminNewsletterComponent implements OnInit {
  emails: any;
  constructor(
    private _newslettersService: NewslettersService,
    private _route: ActivatedRoute,
    private _router: Router) { }
  
  ngOnInit() {
    this.getNewsletter();
  }
  getNewsletter(){
    let obs = this._newslettersService.getNewsletters();
    obs.subscribe(data => this.emails = data);
  }
}
