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
    isMentor: boolean;
    application_submitted: boolean;
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
        this.application_submitted = false;
        this.searchBar = {
            featuredNumber: 8,
            bar: "",
            mental_health: false,
            financial_advice: false,
            career_advice: false,
            technical_advice: false
        }
        if (this.isLoggedIn()){
            this.isApplicationSubmitted();
            this.getUserInfo()
            this.newMentor={
                user: this._authenticationsService.getUserDetails()._id,
                support: { mental_health: false,
                    financial_advice: false,
                    career_advice: false,
                    technical_advice: false },
                resume: "",
            }
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
        if(this._authenticationsService.isLoggedIn()){
            this.isApplicationSubmitted();
        }
        return this._authenticationsService.isLoggedIn();
    }
    isApplicationSubmitted(){
        let obs = this._mentorsService.getApprovals();
        obs.subscribe(data => {
            for(let mentor in data){
                if(data[mentor].user._id === this._authenticationsService.getUserDetails()._id){
                    this.application_submitted = true;
                }
            } 
        })
    }
    getUserInfo(){
        this.userInfo = this._authenticationsService.getUserDetails();
        let obs = this._authenticationsService.profile();
        obs.subscribe(data =>{
            this.userInfo = {
                email: data['email'],
                firstName: data['firstName'],
                lastName: data['lastName'],
                title: data['title'],
                state: data['state'],
                org: data['org']
            }
        })
    }
    open() {
        if (this.isLoggedIn()){
            this.modal = this._modalService.open(this.becomeAMentor, { size: 'lg'});
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
        this.newMentor={
            user: null,
            support: { mental_health: false,
                financial_advice: false,
                career_advice: false,
                technical_advice: false },
            resume: "",
        }
    }
    getMentors(){
        let obs = this._mentorsService.getMentors();
        obs.subscribe(data => {
            console.log(data);
            this.mentors = data;
            if (this._authenticationsService.isLoggedIn()){
                if (this.mentors.find(x => x.user._id === this._authenticationsService.getUserDetails()._id)){
                    this.isMentor = true;
                }
                this.mentors = this.mentors.filter(x => x.user._id !== this._authenticationsService.getUserDetails()._id);
            }
        });
    }
    addMentor(){
        this.user_errors = null;
        this.mentor_errors = null;
        let obs = this._usersService.userUpdate(this.userInfo._id, this.userInfo)
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
                        this.application_submitted = true;
                    }
                })
            }
        })
    }
    seeMore(){
        this.searchBar.featuredNumber += 8;
    }


}
