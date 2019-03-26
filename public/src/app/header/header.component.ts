import { Component, OnInit } from '@angular/core';
import { UsersService } from '../http_services/users.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { BootstrapOptions } from '@angular/core/src/application_ref';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedin: boolean = false;
  constructor(private _UsersService: UsersService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.isLoggedIn()
  }
  isLoggedIn(){
    if (localStorage.getItem('user_id')){
      this.loggedin=true;
    }
  }
}
