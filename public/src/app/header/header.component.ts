import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthenticationService, TokenPayload } from '../http_services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventsService } from '../http_services/events.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loginSubscription: Subscription;
  signUpSubscription: Subscription;
  states: any = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY', 'Other' ];
  modal_string: String;
  modal: any;
  loginInfo: TokenPayload;
  loginErrors: any;
  newUser: TokenPayload;
  password_confirm: String;
  registerErrors:any;
  //element refs
  @ViewChild('login') login: ElementRef
  @ViewChild('signup') signup: ElementRef
  constructor(
    private _eventsService: EventsService,
    private _modalService:  NgbModal,
    private _authenticationsService: AuthenticationService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.loginInfo = { email: "",
    password: ""}
    this.newUser = {
      firstName:"",
      lastName:"",
      email: "",
      password: "",
      state: "AL",
      title: "Vet Tech",
      org: "",
    }
    this.password_confirm = "";
    this.loginSubscription = this._eventsService.openLogin().subscribe(()=>{
      this.open("login");
    });
    this.signUpSubscription = this._eventsService.openSignup().subscribe(()=>{
      this.open("signup");
    });
  }
  open(content) {
    if(content == 'login'){
      this.modal = this._modalService.open(this.login);
      this.modal_string = "login";
    }
    else if(content == 'signup'){
      this.modal = this._modalService.open(this.signup);
      this.modal_string = "signup";
    }
    this.modal.result.then(()=>{}, () => this.closedModal())
  }
  switch(){
    if (this.modal_string == "login"){
      this.modal.close();
      this.open("signup");
    }
    else if (this.modal_string == "signup"){
      this.modal.close();
      this.open("login");
    }
  }
  loggingIn(){
    let obs = this._authenticationsService.login(this.loginInfo);
    obs.subscribe(data => {
      if (data["errors"]){
        this.loginErrors = data;
      }
      else{
        this.modal.close();
        this.closedModal();
      }
    })
  }
  closedModal(){
    this.modal = null;
    this.modal_string = null;
    this.loginInfo = { email: "",
    password: ""}
    this.newUser = {
      firstName:"",
      lastName:"",
      email: "",
      password: "",
      state: "AL",
      title: "Vet Tech",
      org: "",
    }
    this.password_confirm = "";
  }
  register(){
    let observable = this._authenticationsService.register(this.newUser);
    observable.subscribe(data => {
      if (data['errors']) {
        console.log(data);
        this.registerErrors = data;
      }
      else{
        this.modal.close();
        this.closedModal();
        this._router.navigateByUrl('/user');
      }
    });
  }
}
