import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private _httpService: HttpService,
    private _router: Router) { }
  newUser:any = {};
  createNewErrors:any;
  loginInput = {};
  loginError :any;
  loggedinUser = {};
  registration=false;
  login=false;
  ngOnInit() {
  }
register(){
  let observable = this._httpService.addUser(this.newUser);
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
        this._router.navigate(['user/details']);
      }
    });
    
}
}
