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

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    @ViewChild('edit') edit: ElementRef;
    @ViewChild('picture') picture: ElementRef;
    current_courses: any;
    completed_courses: any;
    img_error: string;
    image: string;
    edit_errors: any;
    editUser: any;
    newsletter: boolean;
    checkbox_newsletter: boolean;
    states: any = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY', 'Other'];
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
        if (str === 'edit') {
            this.modal = this._modalsService.open(this.edit, { size: 'lg' });
        }
        if (str === 'picture') {
            this.modal = this._modalsService.open(this.picture);
        }
        this.modal.result.then(() => { }, () => this.closedModal());
    }
    closedModal() {
        this.image = '';
        this.getUserInfo();
    }
    editting(){
        var old_email = this.userInfo.email;
        var new_email = this.editUser.email;
        this.edit_errors = null;
        let obs = this._usersService.userUpdate(this.userInfo._id, this.editUser)
        obs.subscribe(data => {
            if (data['errors']){
                this.edit_errors = data['errors'];
            }
            else{
                this.changeNewsletterStatus(old_email, new_email);
            }
        });
    }
    changeNewsletterStatus(old_email, new_email){
        if (this.newsletter !== this.checkbox_newsletter){
            if (old_email !== new_email){
                if(this.newsletter){
                    let obs = this._newslettersService.deleteNewsletter(old_email);
                    obs.subscribe(data => {
                        console.log(data);
                        this.getUserInfo();
                        this.modal.dismiss("edit succeeded");
                    });
                }
                else{
                    let obs = this._newslettersService.deleteNewsletter(old_email);
                    obs.subscribe(data => {
                        console.log(data);
                        this.getUserInfo();
                        this.modal.dismiss("edit succeeded");
                    });
                    let obs2 = this._newslettersService.addNewsletter({email: new_email});
                    obs2.subscribe(data => {
                        console.log(data);
                        this.getUserInfo();
                        this.modal.dismiss("edit succeeded");
                    });
                }
            }
            else{
                if(this.newsletter){
                    let obs = this._newslettersService.deleteNewsletter(old_email);
                    obs.subscribe(data => {
                        console.log(data);
                        this.getUserInfo();
                        this.modal.dismiss("edit succeeded");
                    });
                }
                else{
                    let obs = this._newslettersService.addNewsletter({email: old_email});
                    obs.subscribe(data => {
                        console.log(data);
                        this.getUserInfo();
                        this.modal.dismiss("edit succeeded");
                    });
                }
            }
        }
        else{
            if (old_email !== new_email){
                if(this.newsletter){
                    let obs = this._newslettersService.deleteNewsletter(old_email);
                    obs.subscribe(data => {
                        console.log(data);
                        this.getUserInfo();
                        this.modal.dismiss("edit succeeded");
                    });
                    let obs2 = this._newslettersService.addNewsletter({email: new_email});
                    obs2.subscribe(data => {
                        console.log(data);
                        this.getUserInfo();
                        this.modal.dismiss("edit succeeded");
                    });
                }
                else{
                    this.getUserInfo();
                    this.modal.dismiss("edit succeeded");
                }
            }
            else{
                this.getUserInfo();
                this.modal.dismiss("edit succeeded");
            }
        }
    }
    approveMentee(id) {
        let obs = this._menteesService.menteeApproval(id);
        obs.subscribe(data => {
            console.log(data);
            this.getUserInfo();
        });
    }
    declineMentee(id) {
        let obs = this._menteesService.menteeDecline(this.userInfo.mentor_id._id, id);
        obs.subscribe(data => {
            console.log(data);
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
            })
        });
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
            console.log(data);
            this.getUserInfo();
        })
    }
    incompleteCourse(id){
        let obs = this._accreditationsService.accreditationUpdate(id, {$set: {credit_received: false}});
        obs.subscribe(data => {
            console.log(data);
            this.getUserInfo();
        })
    }
    editImage() {
        this.img_error = null;
        let obs = this._filesUploadService.userUploadImage(this.croppedImage);
        obs.subscribe(
            (data) => {
                var image = data['imageUrl'];
                let obs = this._usersService.updateImage(this.userInfo._id, image);
                obs.subscribe(data => {
                    if (data['errors']) {
                        this.img_error = data['errors'].picture.message;
                    }
                    else {
                        this.imageChangedEvent = '';
                        this.croppedImage = null;
                        this.getUserInfo();
                    }
                });
            },
            (err) => {

            });
    }
}
