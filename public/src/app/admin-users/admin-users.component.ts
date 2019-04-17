import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsersService } from '../http_services/users.service';
import { ExcelsService } from '../http_services/excels.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  users: any;
  constructor(
    private _excelsService: ExcelsService,
    private _usersService: UsersService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    let obs = this._usersService.getUsers();
    obs.subscribe(data => this.users=data)
  }

  exportAsXLSX():void {
    this._excelsService.exportAsExcelFile(this.users, 'users');
  }
}