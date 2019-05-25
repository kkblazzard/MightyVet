import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NewslettersService } from '../http_services/newsletters.service';
import { ExcelsService } from '../http_services/excels.service';

@Component({
  selector: 'app-admin-newsletter',
  templateUrl: './admin-newsletter.component.html',
  styleUrls: ['./admin-newsletter.component.css']
})
export class AdminNewsletterComponent implements OnInit {
  alert: boolean;
  emails: any;
  emailsArray: any;
  email: any;
  constructor(
    private _newslettersService: NewslettersService,
    private _excelsService: ExcelsService,
    private _route: ActivatedRoute,
    private _router: Router) { }
  
  ngOnInit() {
    this.alert = false;
    this.getNewsletter();
  }
  getNewsletter(){
    let obs = this._newslettersService.getNewsletters();
    obs.subscribe(newsletters => {
      this.emails = newsletters;
      this.emailsArray = [];
      for(let email of this.emails){
        this.emailsArray.push({emails: email.email})
      }
      this.email = this.emailsArray.map(x => {return x.emails}).join(", ");
    });
  }
  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.alert = true;
    setTimeout(() => this.alert = false, 4000)
  }
  exportAsXLSX():void {
    this._excelsService.exportAsExcelFile(this.emailsArray, 'newsletter');
  }
}
