import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PartnersService } from '../http_services/partners.service';

@Component({
  selector: 'app-admin-partners',
  templateUrl: './admin-partners.component.html',
  styleUrls: ['./admin-partners.component.css']
})
export class AdminPartnersComponent implements OnInit {
  partners: any;
  newPartner: any = {tier: 1, partner: {name: "", img: "", link: ""}};
  constructor(
    private _partnersService: PartnersService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }

  ngOnInit() {
    this.getPartners();
  }

  getPartners(){
    let obs = this._partnersService.getPartners();
    obs.subscribe(data=>this.partners=data)}
  addPartner(){
    let obs = this._partnersService.addPartner(this.newPartner);
    obs.subscribe(data=>{
      console.log(data);
      this.getPartners();
      this.newPartner= {tier: 1, partner: {name: "", img: "", link: ""}};
    });
  }
}
