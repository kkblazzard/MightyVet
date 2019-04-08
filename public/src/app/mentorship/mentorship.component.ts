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
    // temp fake mentor data
    featuredMentors = [
        {
            "image": "profile_steve.png",
            "title": "Dr. Steve Weinrauch, BVMS, MRCVS",
            "position": "Founder, MightyVet",
            "description" : 
                `
                    Dr. Steve is a great resource for those interested in 
                    a veterinary industry career outside of practice. He is 
                    the founder of MightyVet, Co-Founder and Medical Director 
                    of 2nd Change Rescue, and Chief Veterinary Officer at 
                    Trupanion. He has published his research in numerous 
                    peer-reviewed journals and is licensed to practice in both 
                    the USA and the European Union. His wife is also a 
                    practicing veterinarian and both graduated from the 
                    Glasgow University School of Veterinary Medicine in 2005.
            `
        },
        {
            "image": "profile_kipperman.png",
            "title": "Barry Kipperman, BVMS, MRCVS, MSc",
            "position": "Veterinarian",
            "description" : 
                `
                    Dr. Kipperman is a practicing veterinarian and an academic. He is 
                    a great resource for those interested in research, academia, 
                    ethics, and career burnout. He recently published two scientific 
                    papers – one on the economic limitations of pet owners in the Journal 
                    of the American Veterinary Medical Association; the other on ethical 
                    dilemmas of veterinarians in Veterinary Record. He is a 1987 graduate 
                    of the University of Missouri College of Veterinary Medicine ...
                `
        },
        {
            "image": "profile_pope.png",
            "title": "Kimberly Pope-Robinson, DVM, CCFP",
            "position": "Founder, 1 Life Connected",
            "description" : 
                `
                    Founder of 1 Life Connected, Dr. Kimberly Pope-Robinson has served in 
                    the veterinary field for over 20 years. After graduating from the UC 
                    Davis School of Veterinary Medicine in 2000, she practiced in both 
                    large and small animal sectors. In 2007 Dr. Pope transitioned from 
                    running a single veterinary hospital to a leadership role where she
                     supported and managed multiple hospital locations. Dr. Pope later 
                     joined the veterinary pharmaceutical industry where she worked with 
                     veterinary specialists as well as veterinary schools.
                `
        },
        {
            "image": "profile_sonnya.png",
            "title": "Sonnya Dennis, DVM, DABVP",
            "position": "Practice Owner",
            "description" : 
                `
                    Dr. Sonnya Dennis graduated from the Virginia-Maryland Regional College
                     of Veterinary Medicine in 1995. Since 1996 she has been the owner and 
                     full-time veterinarian at Stratham-Newfields Veterinary Hospital. Dr. 
                     Dennis is Board-Certified in Canine and Feline Practice with the 
                     American Board of Veterinary Practitioners and is Chair of the AAHA
                      Veterinary Informatics Committee & Diagnostic Terms Editorial Board.
                       She is on the AAFP Hyperthyroid Guidelines Panel, President of the
                       Association for Veterinary...
                `
        },
        {
            "image": "profile_carrie.png",
            "title": "Carrie Jurney, DVM, DACVIM",
            "position": "NOMV Board Member Specialization: Neurology",
            "description" : 
                `
                    Founder of Jurney Veterinary Neurology, Dr. Jurney graduated 
                    summa cum laude from the University of Georgia, College of 
                    Veterinary Medicine in 2005. She was awarded her neurology
                     diplomate in 2009 and her Advanced Neurosurgery Certificate 
                     in 2011. She currently serves on the board of Not One More
                      Vet (NOMV). Her experiences on NOMV have led her to seek 
                      continuing education in mental health and suicide prevention, 
                      so she can better understand and be part of the solution 
                      for the veterinary mental health crisis.
                `
        },
        {
            "image": "profile_nicole.png",
            "title": "Nicole Blackmer-McArthur, DVM",
            "position": "NOMV Founder",
            "description" : 
                `
                    Dr. McArthur is a second-generation veterinarian who graduated 
                    from UC Davis School of Veterinary Medicine in 2001. Seeing a 
                    need for veterinarians to be able to communicate openly with their 
                    peers, Nicole started a secret Facebook group called Not One More 
                    Vet, an online veterinary support group that has grown to over 
                    15,000 veterinarian members. The group provides emotional, financial, 
                    and professional mental health support to its members.
                `
        },
        {
            "image": "profile_jason.png",
            "title": "Jason Sweitzer, DVM, RVT",
            "position": "NOMV Board Member & CFO | Founder Not One More Vet Student",
            "description" : 
                `
                    Dr. Sweitzer has worked in veterinary medicine for 18 years 
                    from kennel assistant, to RVT, to DVM. He graduated from UC 
                    Davis with his DVM in 2009 with focuses on small and exotic 
                    animals, behavior, and business management. He is the Intern 
                    Director at Conejo Valley Vet Hospital a 24/7 GP and ER hospital 
                    in Thousand Oaks, CA. His goals include bringing awareness to mental 
                    health issues within the profession, speaking about them with passion 
                    and humor, and empowering the profession to help address these critical issues.
                `
        },
        {
            "image": "profile_susie.png",
            "title": " Susie Superlongname, DVM",
            "position": "Role and title Organization Specialization",
            "description" : 
                `
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac 
                    ut consequat semper viverra nam libero justo laoreet sit. Diam 
                    sollicitudin tempor id eu nisl nunc mi ipsum faucibus. Ut ornare 
                    lectus sit amet est placerat in. Sollicitudin nibh sit amet commodo 
                    nulla facilisi nullam vehicula ipsum. Diam vel quam elementum 
                    pulvinar etiam non. Venenatis cras sed felis eget. Faucibus 
                    scelerisque eleifend donec pretium.
                `
        },
    ]

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
        // this.featuredMentors = this.mentors[0-7];
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

    /*
    retrieveAllMentors(){
        send request to service to get all mentors from database
        return mentors list 
    }

    searchBar(search_data){
        use a service to loop through for anything that matches the string
        elimante extra searches based on checkboxes
    }

    displayMentor(id){
        have modal pop up displaying all information with current user selected based on id 
    }

    scheduleWithMentor(){
        pop up menu of calendar to schedule with a mentor
    }

    findaMentor(){
        pull up full list of mentors???
    }

    */




}
