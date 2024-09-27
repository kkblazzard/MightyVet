import { Component, OnInit } from '@angular/core';
import { NewslettersService } from '../http_services/newsletters.service'

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.css']
})
export class UnsubscribeComponent implements OnInit {
  newsletter;
  newsletter_errors;
  newsletterSuccess;
  constructor(private _newslettersService: NewslettersService) { }

  ngOnInit() {
  }
  unsubscribe(){
    this.newsletter_errors = null;
    this.newsletterSuccess = false;
    let obs = this._newslettersService.deleteNewsletter(this.newsletter.toLowerCase());
    obs.subscribe(data => {
      if (!data){
        this.newsletter_errors = "We could not find this email in the newsletter database.";
      }
      else{
        this.newsletterSuccess = true;
        this.newsletter = "";
      }
    })
  }
}
