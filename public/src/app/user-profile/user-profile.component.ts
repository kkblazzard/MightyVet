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
    userInfo;
    continuingEducationContent = "PROGRESS";
    constructor(
        private _authenticationsService: AuthenticationService,
        private _route: Router,
        private _usersService: UsersService
    ) { }

    ngOnInit() {
        // make sure someone is logged in or move them back to homepage
        this.getUserInfo();
    }
    isLoggedIn() {
        return this._authenticationsService.isLoggedIn();
    }
    getUserInfo() {
        this.userInfo = this._authenticationsService.getUserDetails();
    }
    continuingEducation(passedLink) {
        this.continuingEducationContent = passedLink.toUpperCase()
    }
    topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
    jumpToEdit() {
        document.body.scrollTop = 900; // For Safari
        document.documentElement.scrollTop = 900; // For Chrome, Firefox, IE and Opera
    }

    deleteUser() {
        alert("delete account");
    }

    // this will eventually go and update the userInfo after some validations.
    updateUser() {
        console.log(
            this.userInfo.email,
            this.userInfo.password,
            this.userInfo.username,
            this.userInfo.picture
        )
    }

}
