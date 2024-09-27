import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from '../http_services/authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _authenticationsService: AuthenticationService,
    ) { }
  ngOnInit() { 
  } 
}
