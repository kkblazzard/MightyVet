import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

export interface UserDetails {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  title: string;
  org: string;
  state: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  title?: string;
  org?: string;
  state?: string;
}

@Injectable({
  providedIn: 'root'
  
})
export class AuthenticationService {
  private token: string;

  constructor(private _http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }
  private request(method: 'post'|'get', type: 'login'|'register'|'profile', user?: TokenPayload) {
    let base;
  
    if (method === 'post') {
      base = this._http.post(`/api/users/${type}`, user);
    } else {
      base = this._http.get(`/api/users/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }
  
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
  
    return request;
  }
  public register(user: TokenPayload) {
    return this.request('post', 'register', user);
  }
  
  public login(user: TokenPayload) {
    return this.request('post', 'login', user);
  }
  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      console.log(user.exp > Date.now() / 1000)
      return user.exp > Date.now() / 1000;
    } 
    else {
      console.log("Not logged in")
      return false;
    }
  }
  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } 
    else {
      return null;
    }
  }
  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
  }
}