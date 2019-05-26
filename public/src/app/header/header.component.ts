import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthenticationService, TokenPayload } from '../http_services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventsService } from '../http_services/events.service';
import { NewslettersService } from '../http_services/newsletters.service';
import { UsersService } from '../http_services/users.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loginSubscription: Subscription;
  signUpSubscription: Subscription;
  states: any = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY', 'Other'];
  modal_string: String;
  modal: any;
  signup_errors: any;
  login_errors: any;
  loginInfo: TokenPayload;
  newUser: any;
  password_confirm: String;
  newsletter: boolean;
  admin: boolean = false;
  // element refs
  @ViewChild('login') login: ElementRef
  @ViewChild('signup') signup: ElementRef
  constructor(
    private _eventsService: EventsService,
    private _modalService: NgbModal,
    private _authenticationsService: AuthenticationService,
    private _newslettersService: NewslettersService,
    private _usersService: UsersService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.newsletter = false;
    this.loginInfo = {
      email: '',
      password: ''
    };
    this.newUser = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      state: 'AL',
      title: 'Vet Tech',
      org: '',
    };
    this.password_confirm = '';
    this.loginSubscription = this._eventsService.openLogin().subscribe(() => {
      this.open('login');
    });
    this.signUpSubscription = this._eventsService.openSignup().subscribe(() => {
      this.open('signup');
    });
  }
  open(content) {
    if (content === 'login') {
      // log in modal
      this.modal = this._modalService.open(this.login);
      this.modal_string = 'login';
    } else if (content === 'signup') {
      // sign up modal
      this.modal = this._modalService.open(this.signup, { size: 'lg' });
      this.modal_string = 'signup';
    }
    this.modal.result.then(() => { }, () => this.closedModal());
  }
  isAdmin(){
    if (this._authenticationsService.isLoggedIn()){
      return this._authenticationsService.getUserDetails().admin;
    }
    return false;
  }
  isLoggedIn(){
    return this._authenticationsService.isLoggedIn();
  }
  logOut(){
    this._authenticationsService.logout();
  }
  switch() {
    if (this.modal_string === 'login') {
      this.modal.close();
      this.open('signup');
    } else if (this.modal_string === 'signup') {
      this.modal.close();
      this.open('login');
    }
  }
  loggingIn() {
    this.login_errors = null;
    this.loginInfo.email = this.loginInfo.email.toLowerCase();
    const obs = this._authenticationsService.login(this.loginInfo);
    obs.subscribe( data => {
      if (data['message']) {
        this.login_errors = "We could not log you in. Please double-check your login information.";
      } else {
        this.modal.close();
        this.closedModal();
        window.location.reload();
      }
    });
  }
  closedModal() {
    this.login_errors = null;
    this.signup_errors = null;
    this.newsletter = false;
    this.modal = null;
    this.modal_string = null;
    this.loginInfo = {
      email: '',
      password: ''
    };
    this.newUser = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      state: 'AL',
      title: 'Vet Tech',
      org: '',
    };
    this.password_confirm = '';
  }
  register() {
    this.signup_errors = null;
    this.newUser.email = this.newUser.email.toLowerCase();
    const obs = this._authenticationsService.register(this.newUser);
    obs.subscribe(data => {
      if (data['errors']) {
        this.signup_errors = data['errors'];
      } else {
        if (this.newsletter === true) {
          const obs2 = this._newslettersService.addNewsletter({ email: this.newUser.email });
          obs2.subscribe( data => console.log(data), err => console.log(err), () => {
            this.modal.close();
            this.closedModal();
            window.location.reload();
          })
        } else {
          this.modal.close();
          this.closedModal();
          window.location.reload();
        }
      }
    });
  }
}
