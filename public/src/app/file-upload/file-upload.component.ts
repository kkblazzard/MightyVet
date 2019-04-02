import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../http_services/file-upload.service'

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  fileToUpload: ImageSnippet = null;
  constructor(private _filesUploadService: FileUploadService 
  ) { }

  ngOnInit() {
  }
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.fileToUpload = new ImageSnippet(event.target.result, file);

      this._filesUploadService.uploadImage(this.fileToUpload.file).subscribe(
        (res) => {
        
        },
        (err) => {
        
        })
    });

    reader.readAsDataURL(file);
  }
}
