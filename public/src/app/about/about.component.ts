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
  getPartners() {
    const obs = this._httpService.getPartners();
    obs.subscribe(data => this.partners = data);
  }
  // need to sort by tier number
}
