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
    let obs = this._usersService.excelUsers();
    obs.subscribe(data => this.users=data)
  }

  exportAsXLSX():void {
    var excelUsers = this.users;
    excelUsers.map(x => {
      if (x.mentors.length){
        x.mentors.filter(y => {
          return y.approval;
        })
        x.mentors.map(y => {
          return `${y.user.firstName} ${y.user.firstName}`;
        });
        x.mentors.join(", ");
      }
      else{
        x.mentors = ""
      }
      x.list_of_mentors = x.mentors;
      delete x.mentors;
      if (x.accreditations.length){
        x.accreditations.map(y => {
          return y.webinar.title;
        });
        x.accreditations.join(", ");
      }
      else{
        x.webinars = "";
      }
      x.list_of_webinars = x.accreditations;
      delete x.accreditations;
      if (x.mentor_id){
        if (x.mentor_id.approval){
          x.mentor = "Yes";
        }
        else{
          x.mentor = "Waiting for approval"
        }
      }
      else{
        x.mentor = "No";
      }
      delete x.mentor_id;
      return x;
    })
    console.log(excelUsers);
    this._excelsService.exportAsExcelFile(excelUsers, 'users');
  }
}