import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PartnersService } from '../http_services/partners.service';
import { FileUploadService } from '../http_services/file-upload.service'

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-admin-partners',
  templateUrl: './admin-partners.component.html',
  styleUrls: ['./admin-partners.component.css']
})
export class AdminPartnersComponent implements OnInit {
  partners: any;
  newPartner: any = {tier: 1, partner: {name: "", img: "", link: ""}};
  fileToUpload: ImageSnippet;
  constructor(
    private _filesUploadService: FileUploadService,
    private _partnersService: PartnersService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }

  ngOnInit() {
    this.getPartners();
  }

  getPartners(){
    let obs = this._partnersService.getPartners();
    obs.subscribe(data=>this.partners=data)}
  addPartner(){
    let obs = this._partnersService.addPartner(this.newPartner);
    obs.subscribe(data=>{
      console.log(data);
      this.getPartners();
      this.newPartner= {tier: 1, partner: {name: "", img: "", link: ""}};
    });
  }
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.fileToUpload = new ImageSnippet(event.target.result, file);
      let obs = this._filesUploadService.partnerUploadImage(this.fileToUpload.file)
      obs.subscribe(
        (data) => {
          this.newPartner.partner.img = data['imageUrl'];
        },
        (err) => {
        
        })
    });

    reader.readAsDataURL(file);
  }
}
