import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MentorsService } from '../http_services/mentors.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-mentors',
  templateUrl: './admin-mentors.component.html',
  styleUrls: ['./admin-mentors.component.css']
})
export class AdminMentorsComponent implements OnInit {
  @ViewChild('applicationViewer') applicationModal: ElementRef;
  approvalMentors: any;
  mentors : any;
  mentorApplication: any;
  modal: any;
  constructor(
    private _modalsService: NgbModal,
    private _mentorsService: MentorsService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }

  ngOnInit() {
    this.mentorApplication = {user: { 
      firstName: "",
      lastName: "",
      email: "",
      title: "",
      org: "",
      state: ""
      },
      resume: "",
    }
    this.getApprovals();
    this.getMentors();
  }
  getApprovals(){
    let obs = this._mentorsService.getApprovals();
    obs.subscribe(data => this.approvalMentors = data);
  }
  getMentors(){
    let obs = this._mentorsService.getMentors();
    obs.subscribe(data => this.mentors = data);
  }
  approveMentor(id, str){
    console.log(str);
    let obs = this._mentorsService.approveMentor(id);
    obs.subscribe(data => {
      this.getApprovals();
      this.getMentors();
      if (str == 'modal'){
        console.log("modal open")
        this.modal.dismiss("application reviewed");
      }
    })
  }
  declineMentor(id, str = null){
    let obs = this._mentorsService.deleteMentor(id);
    obs.subscribe(data => {
      this.getApprovals();
      this.getMentors();
      if (str === 'modal'){
        console.log("modal open")
        this.modal.dismiss("application reviewed");
      }
    });
  }
  openModal(id){
    let obs = this._mentorsService.getMentor(id);
    obs.subscribe(data => {
      this.mentorApplication = data;
      this.modal = this._modalsService.open(this.applicationModal);
      this.modal.result.then(()=>{}, () => this.closedModal());
    })
  }
  closedModal(){
    this.mentorApplication = {user: { 
      firstName: "",
      lastName: "",
      email: "",
      title: "",
      org: "",
      state: ""
      },
      resume: "",
    }
    this.getApprovals();
    this.getMentors();
  }
}
