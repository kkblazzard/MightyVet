import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService, UserDetails } from '../http_services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService implements CanActivate{

  constructor(
    private _router: Router,
    private _authenticationsService: AuthenticationService
  ) { }
  canActivate() {
    if (this._authenticationsService.isLoggedIn()) {
      if (this._authenticationsService.getUserDetails().admin){
        return true;
      }
        this._router.navigateByUrl('/');
        return false;
    }
    this._router.navigateByUrl('/');
    return false;
  }
}