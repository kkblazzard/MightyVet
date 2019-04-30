import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WebinarsService } from '../http_services/webinars.service';
import { SpeakersService } from '../http_services/speakers.service';
import { FileUploadService } from '../http_services/file-upload.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import * as moment from 'moment'


class ImageSnippet {
  pending: boolean = false;
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
  time_errors: string;
  webinarTime: any;
  webinarDate: any;
  errors: any;
  speaker_errors: any;
  modal: any;
  speaker_image: String;
  speakerPreview: String;
  fileToUpload2: ImageSnippet;
  newQuestions = 0;
  newAnswers = 0;
  speaker: any = {title: '', firstName: '', lastName: '', description: '', img: ''};
  stage = 1;
  newWebinar: any = {
    title: '', type: '', description: '', speaker: '', webinar_link: '', quiz: [], 
    category: {
      management: false,
      communication: false,
      medical: false,
      technical: false
    }
  };
  webinars: any;
  speakers: any;
  newSpeaker: any = {title: '', firstName: '', lastName: '', description: '', img: ''};
  imageChangedEvent: any = '';
  croppedImage: any = '';
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
  private onSuccess2() {
    this.fileToUpload2.pending = false;
    this.fileToUpload2.status = 'ok';
  }

  private onError2() {
    this.fileToUpload2.pending = false;
    this.fileToUpload2.status = 'fail';
    this.fileToUpload2.src = '';
  }
  
  ngOnInit() {
    this.getWebinars();
    this.getSpeakers();
    this.speaker_image = '';
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
        console.log(data);
        this.getWebinars();
        this.modal.dismiss("form completed")
      }
      else{
        this.newWebinar.speaker = temp;
        console.log(data['errors']);
        this.errors = data['errors'];
      }
    });
  }
  stage1() {
    this.stage = 1;
  }
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
    this.webinarTime = null;
    this.webinarDate = null;
    this.errors = null;
    this.speaker_errors = null;
    this.stage = 1;
    this.speaker = {title: '', firstName: '', lastName: '', description: '', img: ''};
    this.newSpeaker = {title: '', firstName: '', lastName: '', description: '', img: ''};
    this.speakerPreview = null;
    this.newWebinar = {title: '', type: '', description: '', speaker: '', webinar_link: '', 
    category: {
      management: false,
      communication: false,
      medical: false,
      technical: false
    }};
    this.fileToUpload2 = {src: null, file: null, pending: false, status: 'init'};
    this.speaker_image = '';
    this.newQuestions = 0;
    this.newAnswers = 0;
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
    this.speaker_errors = null;
    const obs = this._filesUploadService.speakerUploadImage(this.croppedImage);
      obs.subscribe(
        (data) => {
          this.newSpeaker.img = data['imageUrl'];
          const obs = this._speakersService.addSpeaker(this.newSpeaker);
          obs.subscribe(data => {
            if (!data['errors']){
            this.getSpeakers();
            this.newWebinar.speaker = data['_id'];
            this.getSpeakerImage();
            this.newSpeaker = {title: '', firstName: '', lastName: '', description: '', img: '', webinars: []};
            }
            else{
              console.log(data['errors']);
              this.speaker_errors = data['errors'];
            }
          });
        },
        (err) => {
          console.log(err);
        })
  }
  processFile2(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.fileToUpload2 = new ImageSnippet(event.target.result, file);
      const obs = this._filesUploadService.webinarUploadImage(this.fileToUpload2.file);
      obs.subscribe(
        (data) => {
          this.onSuccess2()
          this.newWebinar.img = data['imageUrl'];
        },
        (err) => {
          this.onError2()
          console.log(err);
        })
    });
    reader.readAsDataURL(file);

  }
  getSpeakerImage() {
    if (this.newWebinar.speaker === '' || this.newWebinar.speaker === 'new' ) {
      this.speaker_image = '';
    } else {
      const obs = this._speakersService.getSpeaker(this.newWebinar.speaker);
      obs.subscribe(data => this.speaker_image = data['img']);
    }
  }
}
