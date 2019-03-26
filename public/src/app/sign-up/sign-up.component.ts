import { Component, OnInit } from '@angular/core';
import { UsersService } from '../http_services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private _usersService: UsersService,
    private _router: Router) { }
  newUser:{};
  createNewErrors:any;
  loginInput = {};
  loginError :any;
  loggedinUser = {};
  registration=false;
  login=false;
  ngOnInit() {
    this.newUser={
      firstName:"",
      LastName:"",
    }
  }
register(){
  let observable = this._usersService.addUser(this.newUser);
    observable.subscribe(data => {
      if (data['errors']) {
        console.log(data);
        this.createNewErrors = data;
      }
      else{
        console.log("successfully added user");
        localStorage.setItem('loginUserID', data['_id']);
        console.log(localStorage.getItem('loginUserID'));
        this.registration=false;
        this._router.navigate(['user']);
      }
    });
    
}
}
