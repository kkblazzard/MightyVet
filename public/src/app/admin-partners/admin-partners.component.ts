import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PartnersService } from '../http_services/partners.service';
import { FileUploadService } from '../http_services/file-upload.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-admin-partners',
  templateUrl: './admin-partners.component.html',
  styleUrls: ['./admin-partners.component.css']
})
export class AdminPartnersComponent implements OnInit {
  @ViewChild("addNewPartner") partnerModal: ElementRef;
  name_error: string;
  img_error: string;
  link_error: string;
  modal: any;
  partners: any;
  newPartner: any = {tier: 1, partner: {name: "", img: "", link: ""}};
  fileToUpload: ImageSnippet;
  constructor(
    private _modalsService: NgbModal,
    private _filesUploadService: FileUploadService,
    private _partnersService: PartnersService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }

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
    this.getPartners();
  }

  getPartners(){
    let obs = this._partnersService.getPartners();
    obs.subscribe(data=>this.partners=data)}
  addPartner(){
    let obs = this._partnersService.addPartner(this.newPartner);
    obs.subscribe(data=>{
      this.name_error = null;
      this.img_error = null;
      this.link_error = null;
      if (!data['errors']){
        this.fileToUpload = {src: null, file: null, pending: false, status: 'init'};
        this.newPartner= {tier: 1, partner: {name: "", img: "", link: ""}};
      }
      else{
        console.log(data['errors']);
        if(data['errors'].partners){
          if(data['errors'].partners.errors.name){
            this.name_error = data['errors'].partners.errors.name.message;
          }
          if(data['errors'].partners.errors.img){
            this.img_error = data['errors'].partners.errors.img.message;
          }
          if(data['errors'].partners.errors.link){
            this.link_error = data['errors'].partners.errors.link.message;
          }
        }
      }
      this.getPartners();
    });
  }
  openModal(){
    this.modal = this._modalsService.open(this.partnerModal)
    this.modal.result.then(()=>{}, () => this.closedModal())
  }
  closedModal(){
    this.newPartner = {tier: 1, partner: {name: "", img: "", link: ""}};
    this.fileToUpload = {src: null, file: null, pending: false, status: 'init'};
  }
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.fileToUpload = new ImageSnippet(event.target.result, file);
      const obs = this._filesUploadService.partnerUploadImage(this.fileToUpload.file);
      obs.subscribe(
        (data) => {
          this.onSuccess();
          this.newPartner.partner.img = data['imageUrl'];
        },
        (err) => {
          this.onError();
          console.log(err);
        })
    });
      
    reader.readAsDataURL(file);
  }
}
