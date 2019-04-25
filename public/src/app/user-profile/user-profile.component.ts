import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileUploadService } from '../http_services/file-upload.service';
import { AuthenticationService } from '../http_services/authentication.service';
import { UsersService } from '../http_services/users.service';
import { Router } from '@angular/router';
import { MenteesService } from '../http_services/mentees.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

class ImageSnippet {
    pending: boolean = false;
    status: string = 'init';
    constructor(public src: string, public file: File) { }
}
@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    @ViewChild('edit') edit: ElementRef;
    @ViewChild('picture') picture: ElementRef;
    img_error: string;
    image: string;
    editUser: any;
    newsletter: boolean;
    states: any = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY', 'Other'];
    modal: any;
    userInfo: any = { picture: "https://s3-us-west-1.amazonaws.com/mightyvet-test/images/profile_images/profile-image-placeholder.png"};
    mentees: any;
    mentee_applications: any;
    continuingEducationContent = "PROGRESS";
    fileToUpload: ImageSnippet;
    constructor(
        private _usersService: UsersService,
        private _authenticationsService: AuthenticationService,
        private _filesUploadService: FileUploadService,
        private _menteesService: MenteesService,
        private _modalsService: NgbModal,
        private _route: Router,
    ) { }

    ngOnInit() {
        this.newsletter = false;
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
    processFile(imageInput: any) {
        const file: File = imageInput.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', (event: any) => {

            this.fileToUpload = new ImageSnippet(event.target.result, file);
            let obs = this._filesUploadService.userUploadImage(this.fileToUpload.file);
            obs.subscribe(
                (data) => {
                    this.image = data['imageUrl'];
                },
                (err) => {

                });
        });
        reader.readAsDataURL(file);
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
        });
    }
    editImage() {
        this.img_error = null;
        let obs = this._usersService.updateImage(this.userInfo._id, this.image);
        obs.subscribe(data => {
            if (data['errors']) {
                this.img_error = data['errors'].picture.message;
            }
            else {
                this.modal.dismiss('success');
            }
        });
    }
    // this will eventually go and update the userInfo after some validations.
}
