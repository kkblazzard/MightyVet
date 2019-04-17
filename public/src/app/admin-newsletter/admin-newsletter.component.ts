import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NewslettersService } from '../http_services/newsletters.service';
import { AnimationStyleMetadata } from '@angular/animations';

@Component({
  selector: 'app-admin-newsletter',
  templateUrl: './admin-newsletter.component.html',
  styleUrls: ['./admin-newsletter.component.css']
})
export class AdminNewsletterComponent implements OnInit {
  alert: boolean;
  emails: any;
  email: any;
  constructor(
    private _newslettersService: NewslettersService,
    private _route: ActivatedRoute,
    private _router: Router) { }
  
  ngOnInit() {
    this.alert = false;
    this.getNewsletter();
  }
  getNewsletter(){
    let obs = this._newslettersService.getNewsletters();
    obs.subscribe(newsletters => {
      console.log(newsletters);
        this.emails = newsletters;
        this.email = [];
        for(let email of this.emails){
          this.email.push(email.email)
        }
        this.email = this.email.join(", ");
    });
  }
  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.alert = true;
    setTimeout(() => this.alert = false, 4000)
  }
}
