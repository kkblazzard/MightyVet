import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PartnersService } from '../http_services/partners.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  partners: any;
  show = [false, false, false, false, false];

  constructor(
    private _httpService: PartnersService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.getPartners();
  }

  //creates observable that uses our partner service to get all partners in the database.
  //we then subscribe to it to render the data once recieved. 
  getPartners() {
    const obs = this._httpService.getPartners();
    obs.subscribe(data => {
      this.partners = data;
      this.partners.sort((a,b) => {return a.tier - b.tier})
    });
  }
}
