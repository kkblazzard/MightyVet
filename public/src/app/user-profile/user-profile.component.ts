import { Component, OnInit } from '@angular/core';
import { UsersService } from '../http_services/users.service';
import { AuthenticationService } from '../http_services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    currentUser;
    userInfo;
    continuingEducationContent = "PROGRESS";
    constructor(
        private _authenticationsService: AuthenticationService,
        private _route: Router,
        private _usersService: UsersService
    ) { }

    ngOnInit() {
        // make sure someone is logged in or move them back to homepage
        if (this.isLoggedIn()){
            this.getUserInfo()
        } 
        else {
            this._route.navigate(['/']);
        } 
        
    }
    isLoggedIn(){
        return this._authenticationsService.isLoggedIn();
    }
    getUserInfo(){
        let obs = this._usersService.getUser(this._authenticationsService.getUserDetails()._id);
        obs.subscribe(data => {
            console.log(data);
            if (data['errors']){
                alert("error");
                console.log(data);
            }
            else{
                // alert("got user info")
                this.userInfo = {
                    firstName: data['firstName'],
                    lastName: data['lastName'],
                    email: data['email'],
                    title: data['title'],
                    password: data['password'],
                    org: data['org'],
                    state: data['state']
                };
                console.log(this.userInfo)
            }
        })
    }


    continuingEducation(passedLink){
        this.continuingEducationContent = passedLink.toUpperCase()
    }
    topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
    jumpToEdit() {
        document.body.scrollTop = 500; // For Safari
        document.documentElement.scrollTop = 500; // For Chrome, Firefox, IE and Opera
    }

    deleteUser(){
        alert("delete account");
    }
    updateUser(){
        console.log(
            this.userInfo.email,
            this.userInfo.password,
            this.userInfo.username
        )
    }

}
