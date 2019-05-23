import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileUploadService } from '../http_services/file-upload.service';
import { AuthenticationService } from '../http_services/authentication.service';
import { AccreditationsService } from '../http_services/accreditations.service';
import { NewslettersService } from '../http_services/newsletters.service';
import { UsersService } from '../http_services/users.service';
import { Router } from '@angular/router';
import { MenteesService } from '../http_services/mentees.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import * as moment from 'moment';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    @ViewChild('edit') edit: ElementRef;
    @ViewChild('picture') picture: ElementRef;
    @ViewChild('password') password: ElementRef;
    selectedDate: any;
    chosenDate: Date;
    selectedDate_errors: string;
    current_credit: Number;
    editPassword: any;
    editPassword_errors: any;
    current_courses: any;
    completed_courses: any;
    picturePending: boolean;
    pictureSuccess: boolean;
    editPending: boolean;
    editSuccess: boolean;
    passwordPending: boolean;
    passwordSuccess: boolean;
    img_error: string;
    image: string;
    edit_errors: any;
    editUser: any;
    newsletter: boolean;
    checkbox_newsletter: boolean;
    states: any = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY', 'Other'];
    state_requirements = {
        'AL':{ "Veterinarian": { hours: 20, years: 1}, "Vet Tech": { hours: 8, years: 1}},
        'AK':{ "Veterinarian": { hours: 30, years: 2}, "Vet Tech": { hours: 10, years: 2}},
        'AZ':{ "Veterinarian": { hours: 20, years: 2}, "Vet Tech": { hours: 10, years: 2}},
        'AS':{ "Veterinarian": { hours: 20, years: 1}, "Vet Tech": { hours: 6, years: 1}},
        'CA':{ "Veterinarian": { hours: 36, years: 2}, "Vet Tech": { hours: 20, years: 2}},
        'CO':{ "Veterinarian": { hours: 32, years: 2}, "Vet Tech": { hours: 0, years: 1}},
        'CT':{ "Veterinarian": { hours: 24, years: 1}, "Vet Tech": { hours: 0, years: 1}},
        'DE':{ "Veterinarian": { hours: 24, years: 2}, "Vet Tech": { hours: 12, years: 2}},
        'DC':{ "Veterinarian": { hours: 36, years: 2}, "Vet Tech": { hours: 0, years: 1}},
        'FL':{ "Veterinarian": { hours: 30, years: 2}, "Vet Tech": { hours: 0, years: 1}},
        'GA':{ "Veterinarian": { hours: 30, years: 2}, "Vet Tech": { hours: 10, years: 2}},
        'HI':{ "Veterinarian": { hours: 20, years: 2}, "Vet Tech": { hours: 0, years: 1}},
        'ID':{ "Veterinarian": { hours: 20, years: 2}, "Vet Tech": { hours: 14, years: 2}},
        'IL':{ "Veterinarian": { hours: 40, years: 2}, "Vet Tech": { hours: 15, years: 2}},
        'IN':{ "Veterinarian": { hours: 40, years: 2}, "Vet Tech": { hours: 16, years: 2}},
        'IA':{ "Veterinarian": { hours: 60, years: 3}, "Vet Tech": { hours: 0, years: 1}},
        'KS':{ "Veterinarian": { hours: 20, years: 1}, "Vet Tech": { hours: 4, years: 1}},
        'KY':{ "Veterinarian": { hours: 30, years: 2}, "Vet Tech": { hours: 6, years: 1}},
        'LA':{ "Veterinarian": { hours: 20, years: 1}, "Vet Tech": { hours: 10, years: 1}},
        'ME':{ "Veterinarian": { hours: 24, years: 2}, "Vet Tech": { hours: 0, years: 1}},
        'MD':{ "Veterinarian": { hours: 18, years: 1}, "Vet Tech": { hours: 24, years: 3}},
        'MA':{ "Veterinarian": { hours: 15, years: 1}, "Vet Tech": { hours: 12, years: 1}},
        'MI':{ "Veterinarian": { hours: 0, years: 1}, "Vet Tech": { hours: 0, years: 1}},
        'MN':{ "Veterinarian": { hours: 40, years: 2}, "Vet Tech": { hours: 0, years: 1}},
        'MS':{ "Veterinarian": { hours: 15, years: 1}, "Vet Tech": { hours: 10, years: 1}},
        'MO':{ "Veterinarian": { hours: 10, years: 1}, "Vet Tech": { hours: 5, years: 1}},
        'MT':{ "Veterinarian": { hours: 20, years: 2}, "Vet Tech": { hours: 0, years: 1}},
        'NE':{ "Veterinarian": { hours: 32, years: 2}, "Vet Tech": { hours: 16, years: 2}},
        'NV':{ "Veterinarian": { hours: 20, years: 1}, "Vet Tech": { hours: 10, years: 1}},
        'NH':{ "Veterinarian": { hours: 12, years: 1}, "Vet Tech": { hours: 0, years: 1}},
        'NJ':{ "Veterinarian": { hours: 20, years: 2}, "Vet Tech": { hours: 0, years: 1}},
        'NM':{ "Veterinarian": { hours: 15, years: 1}, "Vet Tech": { hours: 8, years: 1}},
        'NY':{ "Veterinarian": { hours: 45, years: 3}, "Vet Tech": { hours: 24, years: 3}},
        'NC':{ "Veterinarian": { hours: 20, years: 1}, "Vet Tech": { hours: 12, years: 2}},
        'ND':{ "Veterinarian": { hours: 24, years: 2}, "Vet Tech": { hours: 8, years: 2}},
        'OH':{ "Veterinarian": { hours: 30, years: 2}, "Vet Tech": { hours: 10, years: 2}},
        'OK':{ "Veterinarian": { hours: 20, years: 1}, "Vet Tech": { hours: 10, years: 1}},
        'OR':{ "Veterinarian": { hours: 30, years: 2}, "Vet Tech": { hours: 15, years: 2}},
        'PA':{ "Veterinarian": { hours: 30, years: 2}, "Vet Tech": { hours: 16, years: 2}},
        'RI':{ "Veterinarian": { hours: 24, years: 2}, "Vet Tech": { hours: 0, years: 1}},
        'SC':{ "Veterinarian": { hours: 30, years: 2}, "Vet Tech": { hours: 10, years: 2}},
        'SD':{ "Veterinarian": { hours: 32, years: 2}, "Vet Tech": { hours: 12, years: 2}},
        'TN':{ "Veterinarian": { hours: 20, years: 1}, "Vet Tech": { hours: 12, years: 1}},
        'TX':{ "Veterinarian": { hours: 17, years: 1}, "Vet Tech": { hours: 0, years: 1}},
        'UT':{ "Veterinarian": { hours: 24, years: 2}, "Vet Tech": { hours: 0, years: 1}},
        'VT':{ "Veterinarian": { hours: 24, years: 2}, "Vet Tech": { hours: 0, years: 1}},
        'VA':{ "Veterinarian": { hours: 15, years: 1}, "Vet Tech": { hours: 8, years: 1}},
        'WA':{ "Veterinarian": { hours: 30, years: 3}, "Vet Tech": { hours: 30, years: 3}},
        'WV':{ "Veterinarian": { hours: 18, years: 1}, "Vet Tech": { hours: 12, years: 1}},
        'WI':{ "Veterinarian": { hours: 30, years: 2}, "Vet Tech": { hours: 15, years: 2}},
        'WY':{ "Veterinarian": { hours: 16, years: 2}, "Vet Tech": { hours: 10, years: 2}},
        'Other':{ "Veterinarian": { hours: 0, years: 0}, "Vet Tech": { hours: 0, years: 0}},
    }
    modal: any;
    userInfo: any = { picture: "https://s3-us-west-1.amazonaws.com/mightyvet-test/images/profile_images/profile-image-placeholder.png"};
    mentees: any;
    mentee_applications: any;
    continuingEducationContent = "progress";
    imageChangedEvent: any = '';
    croppedImage: any = '';
    constructor(
        private _accreditationsService: AccreditationsService,
        private _usersService: UsersService,
        private _authenticationsService: AuthenticationService,
        private _newslettersService: NewslettersService,
        private _filesUploadService: FileUploadService,
        private _menteesService: MenteesService,
        private _modalsService: NgbModal,
        private _route: Router,
    ) { }

    ngOnInit() {
        this.editPassword = { old: "",
            new: "",
            confirm: ""
        }
        this.editUser = {
            firstName: "",
            lastName: "",
            email: "",
            state: "AL",
            title: "Vet Tech",
            org: ""
        }
        this.getUserInfo();
    }
    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.file;
    }
    imageLoaded() {
        // show cropper
    }
    cropperReady() {
        // cropper ready
    }
    loadImageFailed() {
        // show message
    }
    changeContent(str){
        this.continuingEducationContent = str;
    }
    open(str) {
        if (str === 'password'){
            this.modal = this._modalsService.open(this.password, { size: 'lg'});
        }
        if (str === 'edit') {
            this.modal = this._modalsService.open(this.edit, { size: 'lg' });
        }
        if (str === 'picture') {
            this.modal = this._modalsService.open(this.picture);
        }
        this.modal.result.then(() => { }, () => this.closedModal());
    }
    closedModal() {
        this.pictureSuccess = false;
        this.editSuccess= false;
        this.passwordSuccess= false;
        this.editPassword = this.editPassword = { old: "",
        new: "",
        confirm: ""
        } 
        this.edit_errors = null;
        this.editPassword_errors = null;
        this.img_error = null;
        this.image = '';
        this.getUserInfo();
    }
    editting(){
        var old_email = this.userInfo.email;
        var new_email = this.editUser.email;
        this.edit_errors = null;
        this.editPending = true;
        let obs = this._usersService.userUpdate(this.userInfo._id, this.editUser)
        obs.subscribe(data => {
            if (data['errors']){
                this.edit_errors = data['errors'];
            }
            else{
                this.editSuccess = true;
                setTimeout(()=>{
                    this.editSuccess = false;
                }, 2000);
                this.changeNewsletterStatus(old_email, new_email);
            }
            this.editPending = false;
        });
    }
    edittingPassword(){
        this.editPassword_errors = null;
        this.passwordPending = true;
        let obs = this._authenticationsService.checkPassword(this.editPassword.new, {email: this._authenticationsService.getUserDetails().email, password: this.editPassword.old});
        obs.subscribe(data => {
            if (data['errors']){
                this.editPassword_errors = data['errors'];
            }
            else{
                this.passwordSuccess = true;
                setTimeout(()=>{
                    this.passwordSuccess = false;
                }, 5000);
            }
            this.passwordPending = false;
        })
    }
    changeNewsletterStatus(old_email, new_email){
        if (this.newsletter !== this.checkbox_newsletter){
            if (old_email !== new_email){
                if(this.newsletter){
                    let obs = this._newslettersService.deleteNewsletter(old_email);
                    obs.subscribe(data => {
                        this.getUserInfo();
                    });
                }
                else{
                    let obs = this._newslettersService.deleteNewsletter(old_email);
                    obs.subscribe(data => {
                        this.getUserInfo();
                    });
                    let obs2 = this._newslettersService.addNewsletter({email: new_email});
                    obs2.subscribe(data => {
                        this.getUserInfo();
                    });
                }
            }
            else{
                if(this.newsletter){
                    let obs = this._newslettersService.deleteNewsletter(old_email);
                    obs.subscribe(data => {
                        this.getUserInfo();
                    });
                }
                else{
                    let obs = this._newslettersService.addNewsletter({email: old_email});
                    obs.subscribe(data => {
                        this.getUserInfo();
                    });
                }
            }
        }
        else{
            if (old_email !== new_email){
                if(this.newsletter){
                    let obs = this._newslettersService.deleteNewsletter(old_email);
                    obs.subscribe(data => {
                        this.getUserInfo();
                    });
                    let obs2 = this._newslettersService.addNewsletter({email: new_email});
                    obs2.subscribe(data => {
                        this.getUserInfo();
                    });
                }
                else{
                    this.getUserInfo();
                }
            }
            else{
                this.getUserInfo();
            }
        }
    }
    approveMentee(id) {
        let obs = this._menteesService.menteeApproval(id);
        obs.subscribe(data => {
            this.getUserInfo();
        });
    }
    declineMentee(id) {
        let obs = this._menteesService.menteeDecline(this.userInfo.mentor_id._id, id);
        obs.subscribe(data => {
            this.getUserInfo();
        });
    }
    isLoggedIn() {
        return this._authenticationsService.isLoggedIn();
    }
    getUserInfo() {
        this.current_courses = [];
        this.completed_courses = [];
        this.mentees = [];
        this.mentee_applications = [];
        let obs = this._authenticationsService.profile();
        obs.subscribe(data => {
            this.userInfo = data;
            this.editUser = {
                firstName: data['firstName'],
                lastName: data['lastName'],
                email: data['email'],
                state: data['state'],
                title: data['title'],
                org: data['org']
            };
            if (data['mentor_id']) {
                var mentees = data['mentor_id']['mentees'];
                for (let mentee of mentees) {
                    mentee.approval ? this.mentees.push(mentee) : this.mentee_applications.push(mentee);
                }
            }
            if(data['accreditations']) {
                for (let accreditation of data['accreditations']){
                    accreditation.credit_received ? this.completed_courses.push(accreditation) : this.current_courses.push(accreditation)
                }
            }
            let obs2 = this._newslettersService.checkNewsletter(this.userInfo.email);
            obs2.subscribe((data) => {
                if (data){
                    this.newsletter = true;
                    this.checkbox_newsletter = true;
                }
                else{
                    this.newsletter = false;
                    this.checkbox_newsletter = false;
                }
                this.picturePending = false;
                this.imageChangedEvent = '';
                this.croppedImage = null;
            })
        });
    }
    changeSelectedDate(){
        this.chosenDate = null;
        this.selectedDate = null;
        this.current_credit = null;
    }
    chooseDate(){
        this.selectedDate_errors = null;
        if(this.selectedDate){
            if(Number.isInteger(this.selectedDate.year) && Number.isInteger(this.selectedDate.month) && Number.isInteger(this.selectedDate.day)){
                this.chosenDate = moment(this.selectedDate.year.toString() + "-" + (this.selectedDate.month.toString().length === 2 ? this.selectedDate.month.toString() : "0" +this.selectedDate.month.toString()) + "-" + (this.selectedDate.day.toString().length === 2 ? this.selectedDate.day.toString() : "0" + this.selectedDate.day.toString())).toDate()
                if(this.chosenDate > new Date()){
                    this.selectedDate_errors = "Please enter a past date."
                    return;
                }
                this.current_credit = this.completed_courses.filter(x => {return moment(x.updatedAt).isSameOrAfter(moment(this.chosenDate))}).length;
            }
            else{
                this.selectedDate_errors = "Please enter a valid date."
            }
        }
        else{
            this.selectedDate_errors = "Please enter a date."
        }
    }
    isProgress(){
        return this.continuingEducationContent === 'progress';
    }
    isCurrent(){
        return this.continuingEducationContent === 'current';
    }
    isCompleted(){
        return this.continuingEducationContent === 'completed';
    }
    completeCourse(id){
        let obs = this._accreditationsService.accreditationUpdate(id, {$set: {credit_received: true}});
        obs.subscribe(data => {
            this.getUserInfo();
        })
    }
    incompleteCourse(id){
        let obs = this._accreditationsService.accreditationUpdate(id, {$set: {credit_received: false}});
        obs.subscribe(data => {
            this.getUserInfo();
        })
    }
    editImage() {
        this.picturePending = true;
        this.img_error = null;
        let obs = this._filesUploadService.userUploadImage(this.croppedImage);
        obs.subscribe(
            (data) => {
                if (data['errors']){
                    this.img_error = data['errors'].picture.message;
                    this.picturePending = false;
                }
                else{
                    var image = data['imageUrl'];
                    let obs = this._usersService.updateImage(this.userInfo._id, image);
                    obs.subscribe(data => {
                        if (data['errors']) {
                            this.img_error = data['errors'].picture.message;
                            this.picturePending = false;
                        }
                        else {
                            this.pictureSuccess = true;
                            setTimeout(() => {
                                this.pictureSuccess = false;
                            }, 5000);
                            this.getUserInfo();
                        }
                    });
                }
            },
            (err) => {

            });
    }
}
