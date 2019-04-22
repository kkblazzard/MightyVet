import { Component, OnInit } from '@angular/core';
import { UsersService } from '../http_services/users.service';
import { AuthenticationService } from '../http_services/authentication.service';
import { Router } from '@angular/router';
import { MenteesService } from '../http_services/mentees.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    userInfo: any = {picture: "https://s3-us-west-1.amazonaws.com/mightyvet-test/images/profile_images/profile-image-placeholder.png"};
    mentees: any;
    mentee_applications: any;
    continuingEducationContent = "PROGRESS";
    constructor(
        private _authenticationsService: AuthenticationService,
        private _menteesService: MenteesService,
        private _route: Router,
        private _usersService: UsersService
    ) { }

    ngOnInit() {
        this.getUserInfo();
    }
    approveMentee(id){
        let obs = this._menteesService.menteeApproval(id);
        obs.subscribe(data => {
            console.log(data);
            this.getUserInfo();
        })
    }
    declineMentee(id){
        let obs = this._menteesService.menteeDecline(this.userInfo.mentor_id._id ,id);
        obs.subscribe(data => {
            console.log(data);
            this.getUserInfo();
        })
    }
    isLoggedIn() {
        return this._authenticationsService.isLoggedIn();
    }
    getUserInfo() {
        this.mentees = [];
        this.mentee_applications = [];
        let obs = this._authenticationsService.profile();
        obs.subscribe(data => {
            this.userInfo = data;
            var mentees = data['mentor_id']['mentees']
            for(let mentee of mentees){
                mentee.approval ? this.mentees.push(mentee) : this.mentee_applications.push(mentee);
            }
        })
    }
    // this will eventually go and update the userInfo after some validations.
}
