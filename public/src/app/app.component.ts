import { Component, OnInit } from '@angular/core';
import { UsersService } from './http_services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _httpService: UsersService){}
  userID: string;

  ngOnInit(){
    this.userID = localStorage.getItem('loginUserID');
  };

  clearLogin(){
    localStorage.clear();
    this.userID = "";
  }
}
