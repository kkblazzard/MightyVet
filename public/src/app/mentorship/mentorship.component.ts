import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsersService } from '../http_services/users.service';
import { AuthenticationService } from '../http_services/authentication.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MentorsService } from '../http_services/mentors.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventsService }  from '../http_services/events.service';


@Component({
    selector: 'app-mentorship',
    templateUrl: './mentorship.component.html',
    styleUrls: ['./mentorship.component.css']
})

export class MentorshipComponent implements OnInit {
    user_errors: any;
    mentor_errors: any;
    states: any;
    userInfo: any;
    mentors: any;
    newMentor: any;
    @ViewChild('becomeAMentor') becomeAMentor: ElementRef
    modal: any;
    searchBar: any;
    constructor(
        private _eventsService: EventsService,
        private _usersService: UsersService,
        private _modalService: NgbModal,
        private _authenticationsService: AuthenticationService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _mentorsService: MentorsService
    ) { }
    
    // gets all information we need when the page loads.
    ngOnInit() {
        this.searchBar = {
            featuredNumber: 8,
            bar: "",
            mental_health: false,
            financial_advice: false,
            career_advice: false,
            technical_advice: false
        }
        if (this.isLoggedIn()){
            this.getUserInfo()
        }
        else{
            this.userInfo = {
                email: "",
                firstName: "",
                lastName: "",
                title: "",
                state: "AL",
                org: ""
            }
            this.newMentor={
                user: null,
                support: { mental_health: false,
                    financial_advice: false,
                    career_advice: false,
                    technical_advice: false },
                resume: "",
            }
        }
        this.states =  [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY', 'Other' ];
        this.getMentors();
    }
    isLoggedIn(){
        return this._authenticationsService.isLoggedIn();
    }
    getUserInfo(){
        let obs = this._usersService.getUser(this._authenticationsService.getUserDetails()._id);
        obs.subscribe(data => {
            if (data['errors']){
                console.log(data);
            }
            else{
                this.userInfo = {
                    firstName: data['firstName'],
                    lastName: data['lastName'],
                    email: data['email'],
                    title: data['title'],
                    org: data['org'],
                    state: data['state']
                };
                this.newMentor= {
                    user: data['_id'],
                    support: {mental_health: false,
                    financial_advice: false,
                    career_advice: false,
                    technical_advice: false },
                    resume: ""
                }
            }
        })
    }
    open() {
        if (this.isLoggedIn()){
            this.getUserInfo()
            this.modal = this._modalService.open(this.becomeAMentor);
            this.modal.result.then(()=>{}, () => this.closedModal())
        }
        else{
            this._eventsService.sendLogin();
        }
    }
    closedModal(){
        this.modal = null;
        this.user_errors = null;
        this.mentor_errors = null;
        if (this.isLoggedIn()){
            this.getUserInfo();
        }
    }
    getMentors(){
        let obs = this._mentorsService.getMentors();
        obs.subscribe(data => this.mentors = data);
    }
    addMentor(){
        this.user_errors = null;
        this.mentor_errors = null;
        let obs = this._usersService.userUpdate(this.newMentor.user, this.userInfo)
        obs.subscribe(data =>{
            if (data['errors']){
                this.user_errors = data['errors'];
            }
            else{
                let obs2 = this._mentorsService.addMentor(this.newMentor);
                obs2.subscribe(data2 => {
                    if (data2['errors']){
                        this.mentor_errors = data2['errors'];
                    }
                    else{
                        this.modal.close();
                    }
                })
            }
        })
    }
    seeMore(){
        this.searchBar.featuredNumber += 8;
    }



}
