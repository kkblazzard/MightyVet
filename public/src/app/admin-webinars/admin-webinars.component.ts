import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WebinarsService } from '../http_services/webinars.service';
import { SpeakersService } from '../http_services/speakers.service';
import { FileUploadService } from '../http_services/file-upload.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import * as moment from 'moment'


class ImageSnippet {
  pending: boolean = true;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-admin-webinars',
  templateUrl: './admin-webinars.component.html',
  styleUrls: ['./admin-webinars.component.css']
})

export class AdminWebinarsComponent implements OnInit {
  @ViewChild('addWebinar') webinarModal: ElementRef;
  @ViewChild('update') updateModal: ElementRef;
  time_errors: string;
  webinarTime: any;
  webinarDate: any;
  errors: any;
  updateErrors: any;
  updateTime_errors: any;
  updateWebinarTime: any;
  updateWebinarDate: any;
  updateWebinarSuccess: boolean;
  updateWebinar : any = {title: '', type: '', description: '', speaker: '', webinar_link: '', 
    category: {
      business: false,
      communication: false,
      mental_health: false,
      well_being: false,
      university_life: false,
      career_path: false
    }
  };
  speaker_errors: any;
  modal: any;
  speakerPreview: String;
  fileToUpload: ImageSnippet;
  // newQuestions = 0;
  // newAnswers = 0;
  speaker: any = {title: '', firstName: '', lastName: '', description: '', img: ''};
  // stage = 1;
  webinarSuccess: boolean;
  newWebinar: any = {
    title: '', type: '', description: '', speaker: '', webinar_link: '', quiz: [], 
    category: {
      business: false,
      communication: false,
      mental_health: false,
      well_being: false,
      university_life: false,
      career_path: false
    }
  };
  webinars: any;
  speakers: any;
  speakerSuccess: boolean;
  speakerPending: boolean;
  newSpeaker: any = {title: '', firstName: '', lastName: '', description: '', img: ''};
  imageChangedEvent: any = '';
  croppedImage: any = '';
  showSpeaker: boolean;

  constructor(
    private _modalsService: NgbModal,
    private _webinarsService: WebinarsService,
    private _speakersService: SpeakersService,
    private _filesUploadService: FileUploadService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }
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
  private onSuccess() {
    this.fileToUpload.pending = false;
    this.fileToUpload.status = 'ok';
  }

  private onError() {
    this.fileToUpload.pending = false;
    this.fileToUpload.status = 'fail';
    this.fileToUpload.src = '';
  }
  
  ngOnInit() {
    this.getWebinars();
    this.getSpeakers();
  }

  getWebinars() {
    const obs = this._webinarsService.getWebinars();
    obs.subscribe(data => this.webinars = data );
  }
  addNewWebinar() {
    this.newWebinar.datetime = null;
    this.errors = null;
    this.time_errors = null;
    if (this.newWebinar.type === "Live"){
      if(this.webinarTime && this.webinarDate){
        if(Number.isInteger(this.webinarTime.hour) && Number.isInteger(this.webinarTime.minute) && Number.isInteger(this.webinarDate.year) && Number.isInteger(this.webinarDate.month) && Number.isInteger(this.webinarDate.day)){
          this.newWebinar.datetime = moment(this.webinarDate.year.toString() + "-" + (this.webinarDate.month.toString().length === 2 ? this.webinarDate.month.toString() : "0" +this.webinarDate.month.toString()) + "-" + (this.webinarDate.day.toString().length === 2 ? this.webinarDate.day.toString() : "0" + this.webinarDate.day.toString())).add(this.webinarTime.hour, "hours").add(this.webinarTime.minute, "minutes").toDate();
          if(this.newWebinar.datetime < new Date()){
            this.time_errors = "Please enter a future date and time."
            return;
          }
        }
        else{
          this.time_errors = "Please enter a valid date and time."
          return;
        }
      }
      else{
        this.time_errors = "Please enter a valid date and time."
        return;
      }
    }
    if(this.newWebinar.speaker === 'new' || this.newWebinar.speaker === ''){
      var temp = this.newWebinar.speaker;
      this.newWebinar.speaker = null;
    }
    const obs = this._webinarsService.addWebinar(this.newWebinar);
    obs.subscribe(data => {
      if (!data['errors']){
        this.webinarSuccess = true;
        setTimeout(() => {
          this.webinarSuccess = false;
          this.newWebinar = {title: '', type: '', description: '', speaker: '', webinar_link: '', 
          category: {
            business: false,
            communication: false,
            mental_health: false,
            well_being: false,
            university_life: false,
            career_path: false
          }};
          this.fileToUpload = null;
        }, 2000);
        this.getWebinars();
      }
      else{
        this.newWebinar.speaker = temp;
        this.errors = data['errors'];
      }
    });
  }
  // stage1() {
  //   this.stage = 1;
  // }
  // stage2() {
  //   this.stage = 2;
  // }
  // stage3() {
  //   this.stage = 3;
  //   const obs = this._speakersService.getSpeaker(this.newWebinar.speaker);
  //   obs.subscribe(data => this.speaker = data);
  // }
  openModal() {
    this.modal = this._modalsService.open(this.webinarModal, {size: 'lg'});
    this.modal.result.then(() => {}, () => this.closedModal());
  }
  closedModal() {
    this.webinarSuccess = false;
    this.speakerSuccess = false;
    this.webinarTime = null;
    this.webinarDate = null;
    this.errors = null;
    this.speaker_errors = null;
    // this.stage = 1;
    this.speaker = {title: '', firstName: '', lastName: '', description: '', img: ''};
    this.newSpeaker = {title: '', firstName: '', lastName: '', description: '', img: ''};
    this.speakerPreview = null;
    this.newWebinar = {title: '', type: '', description: '', speaker: '', webinar_link: '', 
    category: {
      business: false,
      communication: false,
      mental_health: false,
      well_being: false,
      university_life: false,
      career_path: false
    }};
    this.fileToUpload = null;
    this.imageChangedEvent = '';
    this.croppedImage = null;
    // this.newQuestions = 0;
    // this.newAnswers = 0;
  }
  // addMultipleQuestions() {
  //   for (let i = 0; i < this.newQuestions; i++) {
  //     this.newWebinar.quiz.push({question: '', right_answer: '', wrong_answers: Array(this.newAnswers).fill('')});
  //   }
  //   this.newQuestions = 0;
  //   this.newAnswers = 0;
  // }
  // addQuestion() {
  //   this.newWebinar.quiz.push({question: '', right_answer: '', wrong_answers: ['']});
  // }
  // addAnswer(index) {
  //   this.newWebinar.quiz[index].wrong_answers.push('');
  //   console.log(index);
  //   console.log(this.newWebinar);
  // }
  // deleteQuestion(i) {
  //   this.newWebinar.quiz.splice(i, 1);
  // }
  // deleteAnswer(i) {
  //   this.newWebinar.quiz[i].wrong_answers.pop();
  // }
  getSpeakers() {
    const obs = this._speakersService.getSpeakers();
    obs.subscribe(data => this.speakers = data);
  }
  addSpeaker() {
    this.speakerPending = true;
    this.speaker_errors = null;
    const obs = this._filesUploadService.speakerUploadImage(this.croppedImage);
      obs.subscribe(
        (data) => {
          this.newSpeaker.img = data['imageUrl'];
          const obs = this._speakersService.addSpeaker(this.newSpeaker);
          obs.subscribe(data => {
            if (!data['errors']){
              this.speakerSuccess = true;
              setTimeout(() => {
                this.speakerSuccess = false
                if(this.modal === this.webinarModal){
                  this.newWebinar.speaker = data['_id'];
                }
                else{
                  this.updateWebinar.speaker = data['_id'];
                }
                this.newSpeaker = {title: '', firstName: '', lastName: '', description: '', img: '', webinars: []};
                this.imageChangedEvent = '';
                this.croppedImage = null;
              }, 1000);
              this.getSpeakers();
            }
            else{
              this.speaker_errors = data['errors'];
            }
            this.speakerPending = false;
          });
        },
        (err) => {
          console.log(err);
        })
  }
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.fileToUpload = new ImageSnippet(event.target.result, file);
      const obs = this._filesUploadService.webinarUploadImage(this.fileToUpload.file);
      obs.subscribe(
        (data) => {
          this.onSuccess()
          this.newWebinar.img = data['imageUrl'];
        },
        (err) => {
          this.onError()
          console.log(err);
        })
    });
    reader.readAsDataURL(file);

  }
  deleteWebinar(id){
    if(confirm("Are you sure?")) {
      let obs = this._webinarsService.deleteWebinar(id);
      obs.subscribe(data => {
        this.getWebinars();
      })
    }
  }
  openUpdate(id){
    this.updateErrors = null;
    this.updateTime_errors = null;
    this.updateWebinarDate = null;
    this.updateWebinarTime = null;
    let obs = this._webinarsService.getWebinar(id);
    obs.subscribe(data => {
      this.updateWebinar = data;
      if (data['datetime']){
        var date = new Date(data['datetime'])
        this.updateWebinarDate = {
          year: date.getFullYear(),
          month: date.getMonth()+1,
          day: date.getDate()
        }
        this.updateWebinarTime = {
          hour: date.getHours(),
          minute: date.getMinutes(),
          seconds: 0,
        }
      }
      this.updateWebinar.speaker = data['speaker']._id
      this.modal = this._modalsService.open(this.updateModal, {size: 'lg'});
      this.modal.result.then(() => {}, () => this.closedModal());
    })
  }
  updatingWebinar(){
    this.updateWebinar.datetime = null;
    this.updateErrors = null;
    this.updateTime_errors = null;
    if (this.updateWebinar.type === "Live"){
      if(this.updateWebinarTime && this.updateWebinarDate){
        if(Number.isInteger(this.updateWebinarTime.hour) && Number.isInteger(this.updateWebinarTime.minute) && Number.isInteger(this.updateWebinarDate.year) && Number.isInteger(this.updateWebinarDate.month) && Number.isInteger(this.updateWebinarDate.day)){
          this.updateWebinar.datetime = moment(this.updateWebinarDate.year.toString() + "-" + (this.updateWebinarDate.month.toString().length === 2 ? this.updateWebinarDate.month.toString() : "0" +this.updateWebinarDate.month.toString()) + "-" + (this.updateWebinarDate.day.toString().length === 2 ? this.updateWebinarDate.day.toString() : "0" + this.updateWebinarDate.day.toString())).add(this.updateWebinarTime.hour, "hours").add(this.updateWebinarTime.minute, "minutes").toDate();
          if(this.updateWebinar.datetime < new Date()){
            this.updateTime_errors = "Please enter a future date and time."
            return;
          }
        }
        else{
          this.updateTime_errors = "Please enter a valid date and time."
          return;
        }
      }
      else{
        this.updateTime_errors = "Please enter a valid date and time."
        return;
      }
    }
    if(this.updateWebinar.speaker === 'new' || this.updateWebinar.speaker === ''){
      var temp = this.updateWebinar.speaker;
      this.updateWebinar.speaker = null;
    }
    console.log(this.updateWebinar);
    let obs = this._webinarsService.webinarUpdate(this.updateWebinar._id, this.updateWebinar);
    obs.subscribe(data => {
      if (!data['errors']){
        this.updateWebinarSuccess = true;
        setTimeout(() => {
          this.updateWebinarSuccess = false;
          this.modal.dismiss('finished updating')
        }, 2000);
        this.getWebinars();
      }
      else{
        this.updateWebinar.speaker = temp;
        this.updateErrors = data['errors'];
      }
    });
  }

  toggleSpeaker() {
    this.showSpeaker = !this.showSpeaker;
  }
}
