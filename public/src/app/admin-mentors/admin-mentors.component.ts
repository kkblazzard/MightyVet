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
  approvalMentors: any;
  mentors : any;
  mentorApplication: any;
  constructor(
    private _modalsService: NgbModal,
    private _mentorsService: MentorsService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }
  ngOnInit() {
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
  approveMentor(id, email){
    if(confirm("Are you sure?")) {
      let obs = this._mentorsService.approveMentor(id);
      obs.subscribe(data => {
        this.getApprovals();
        this.getMentors();
      });
    }
  }
  declineMentor(id){
    if(confirm("Are you sure?")) {
      let obs = this._mentorsService.deleteMentor(id);
      obs.subscribe(data => {
        this.getApprovals();
        this.getMentors();
      })
    }
  }
}
