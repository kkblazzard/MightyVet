import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PartnersService } from '../http_services/partners.service'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  partners: any;
  constructor(
    private _httpService: PartnersService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.getPartners();
  }
  getPartners(){
    let obs = this._httpService.getPartners()
    obs.subscribe(data=>this.partners=data)}
}
