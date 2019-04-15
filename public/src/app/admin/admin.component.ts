import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ComponentFixtureNoNgZone } from '@angular/core/testing';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  newPartner: any = {tier: 1, partner: {name: "", img: "", link: ""}};
  partners: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router
    ) { }
  ngOnInit() {
  } 
}
