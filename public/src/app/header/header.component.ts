import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthenticationService, TokenPayload } from '../http_services/authentication.service';
import { BootstrapOptions } from '@angular/core/src/application_ref';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  states: any = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY', 'Other' ];
  modal: any;
  loginInfo: TokenPayload;
  loginErrors: any;
  newUser: TokenPayload;
  password_confirm: String;
  registerErrors:any;
  constructor(
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
  }
  open(content) {
    this.modal = this._modalService.open(content);
    this.modal.result.then(()=>{}, () => this.closedModal())
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
