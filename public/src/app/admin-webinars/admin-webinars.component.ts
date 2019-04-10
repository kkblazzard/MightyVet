import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WebinarsService } from '../http_services/webinars.service';
import { SpeakersService } from '../http_services/speakers.service';
import { FileUploadService } from '../http_services/file-upload.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-admin-webinars',
  templateUrl: './admin-webinars.component.html',
  styleUrls: ['./admin-webinars.component.css']
})

export class AdminWebinarsComponent implements OnInit {
  @ViewChild('addWebinar') webinarModal: ElementRef;
  modal: any;
  speaker_image: String = '';
  fileToUpload: ImageSnippet;
  fileToUpload2: ImageSnippet;
  newQuestions = 0;
  newAnswers = 0;
  speaker: any = {title: '', firstName: '', lastName: '', description: '', img: ''};
  stage = 1;
  newWebinar: any = {title: '', type: 'Live', datetime: new Date(), description: '', speaker: '', webinar_link: '', quiz: []};
  webinars: any;
  speakers: any;
  newSpeaker: any = {title: '', firstName: '', lastName: '', description: '', img: ''};
  constructor(
    private _modalsService: NgbModal,
    private _webinarsService: WebinarsService,
    private _speakersService: SpeakersService,
    private _filesUploadService: FileUploadService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }

  ngOnInit() {
    this.getWebinars();
    this.getSpeakers();
  }

  getWebinars() {
    const obs = this._webinarsService.getWebinars();
    obs.subscribe(data => this.webinars = data );
  }
  addNewWebinar() {
    const obs = this._webinarsService.addWebinar(this.newWebinar);
    obs.subscribe(data => {
      console.log(data);
      if (!data['errors']) {
        this.getWebinars();
        this.newWebinar = {title: '', type: 'Live', datetime: new Date(), description: '', speaker: '', webinar_link: '', quiz: []};
      }
    });
  }
  stage1() {
    this.stage = 1;
  }
  stage2() {
    this.stage = 2;
    console.log(this.newWebinar.datetime);
  }
  stage3() {
    this.stage = 3;
    const obs = this._speakersService.getSpeaker(this.newWebinar.speaker);
    obs.subscribe(data => this.speaker = data);
  }
  openModal() {
    this.modal = this._modalsService.open(this.webinarModal, {size: 'lg'});
    this.modal.result.then(() => {}, () => this.closedModal());
  }
  closedModal() {
    this.stage = 1;
    this.speaker = {title: '', firstName: '', lastName: '', description: '', img: ''};
    this.newSpeaker = {title: '', firstName: '', lastName: '', description: '', img: ''};
    this.newWebinar = {title: '', type: 'Live', datetime: new Date(), description: '', speaker: '', webinar_link: '', quiz: []};
    this.fileToUpload = {src: null, file: null};
    this.fileToUpload2 = {src: null, file: null};
    this.speaker_image = '';
    this.newQuestions = 0;
    this.newAnswers = 0;
  }
  // 3 next functions are to allow model binding with datetime-local input
  private parseDateToStringWithFormat(date: Date): string {
    let result: string;
    let dd = date.getDate().toString();
    let mm = (date.getMonth() + 1).toString();
    let hh = date.getHours().toString();
    let min = date.getMinutes().toString();
    dd = dd.length === 2 ? dd : '0' + dd;
    mm = mm.length === 2 ? mm : '0' + mm;
    hh = hh.length === 2 ? hh : '0' + hh;
    min = min.length === 2 ? min : '0' + min;
    result = [date.getFullYear(), '-', mm, '-', dd, 'T', hh, ':', min].join('');
    return result;
  }

  public set dateTimeLocal(v: string) {
    const actualParsedDate = v ? new Date(v) : new Date();
    const normalizedParsedDate = new Date(actualParsedDate.getTime() + (actualParsedDate.getTimezoneOffset() * 60000));
    this.newWebinar.datetime = normalizedParsedDate;
  }

  public get dateTimeLocal(): string {
    return this.parseDateToStringWithFormat(this.newWebinar.datetime);
  }
  addMultipleQuestions() {
    for (let i = 0; i < this.newQuestions; i++) {
      this.newWebinar.quiz.push({question: '', right_answer: '', wrong_answers: Array(this.newAnswers).fill('')});
    }
    this.newQuestions = 0;
    this.newAnswers = 0;
  }
  addQuestion() {
    this.newWebinar.quiz.push({question: '', right_answer: '', wrong_answers: ['']});
  }
  addAnswer(index) {
    this.newWebinar.quiz[index].wrong_answers.push('');
    console.log(index);
    console.log(this.newWebinar);
  }
  deleteQuestion(i) {
    this.newWebinar.quiz.splice(i, 1);
  }
  deleteAnswer(i) {
    this.newWebinar.quiz[i].wrong_answers.pop();
  }
  getSpeakers() {
    const obs = this._speakersService.getSpeakers();
    obs.subscribe(data => this.speakers = data);
  }
  addSpeaker() {
    const obs = this._speakersService.addSpeaker(this.newSpeaker);
    obs.subscribe(data => {
      console.log(data);
      this.getSpeakers();
      this.newWebinar.speaker = data['_id'];
      this.fileToUpload.src = '';
      this.fileToUpload.file = null;
      this.getSpeakerImage();
      this.newSpeaker = {title: '', firstName: '', lastName: '', description: '', img: '', webinars: []};
    });
  }
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.fileToUpload = new ImageSnippet(event.target.result, file);
      const obs = this._filesUploadService.speakerUploadImage(this.fileToUpload.file);
      obs.subscribe(
        (data) => {
          this.newSpeaker.img = data['imageUrl'];
        },
        (err) => {
          console.log(err);
        });
    });

    reader.readAsDataURL(file);
  }
  processFile2(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.fileToUpload2 = new ImageSnippet(event.target.result, file);
      const obs = this._filesUploadService.webinarUploadImage(this.fileToUpload2.file);
      obs.subscribe(
        (data) => {
          this.newWebinar.img = data['imageUrl'];
        },
        (err) => {
          console.log(err);
        });
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
