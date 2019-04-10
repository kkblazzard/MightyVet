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
    // what kind of mentee support needed checkboxes on and off switches

    mentalHealthBox = false;
    financialAdviceBox = false;
    careerAdviceBox = false;
    technicalBox = false;
    // form info
    states: any = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY', 'Other' ];
    userInfo: any;
    mentors: any;
    newMentor: any;
    //element refs
    @ViewChild('becomeAMentor') becomeAMentor: ElementRef

    featuredNumber: number;

    modal: any;

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
                resume: "",
            }
        }
        this.getMentors();
        this.featuredNumber = 7;
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
                    resume: "",
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
        if (this.isLoggedIn()){
            this.getUserInfo();
        }
    }
    getMentors(){
        let obs = this._mentorsService.getMentors();
        obs.subscribe(data => this.mentors = data);
    }
    addMentor(){
        let obs = this._usersService.userUpdate(this.newMentor.user, this.userInfo)
        obs.subscribe(data =>{
            console.log(data);
            if (data['errors']){
                console.log("Something went wrong when updating user data")
                //if user update failed
            }
            else{
                console.log("Successfully updated user information")
                let obs2 = this._mentorsService.addMentor(this.newMentor);
                obs2.subscribe(data => {
                    if (data['errors']){
                        console.log("Something went wrong when adding new mentor", data)
                        //if adding mentor failed
                    }
                    else{
                        console.log("Successfully added new mentor")
                        this.modal.close();
                    }
                })
            }
        })
    }

    // switches the appropiate checked box on or off for searching later
    supportBox(message:string){
        if (message === "Mental Health"){
            this.mentalHealthBox = !this.mentalHealthBox;
        } else if (message === "Financial Advice"){
            this.financialAdviceBox = !this.financialAdviceBox;
        } else if (message === "Career Advice"){
            this.careerAdviceBox = !this.careerAdviceBox;
        } else if (message === "Technical or Surgical"){
            this.technicalBox = !this.technicalBox;
        }
    }

    // action when form is submitted
    submit(){
        // this will keep all the form data
        // 
        // 
        // 


        // keeps track of boxes checked when submitted
        console.log( 
            [
                {"mentalHealthBox": this.mentalHealthBox},
                {"financialAdiveBox": this.financialAdviceBox},
                {"careerAdviceBox": this.careerAdviceBox},
                {"technicalBox": this.technicalBox}
            ]
        );


        // area that will eventually submit all data based on form input and checkboxes
        // 
        // 
        // 
    }
    seeMore(){
        this.featuredNumber += 8;
    }
    
    /*
    searchBar(search_data){
        use a service to loop through for anything that matches the string
        elimante extra searches based on checkboxes
    }
    */




}
