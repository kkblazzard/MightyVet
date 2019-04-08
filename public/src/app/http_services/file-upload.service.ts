import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private _http: HttpClient) { }

  public speakerUploadImage(image: File) {
    console.log("http.service uploading speaker image");
    const formData = new FormData();

    formData.append('image', image);

    return this._http.post('/api/speakers/imageupload', formData);
  }
  public webinarUploadImage(image: File) {
    console.log("http.service uploading webinar image");
    const formData = new FormData();

    formData.append('image', image);

    return this._http.post('/api/webinars/imageupload', formData);
  }
  public userUploadImage(image: File) {
    console.log("http.service uploading user image");
    const formData = new FormData();

    formData.append('image', image);

    return this._http.post('/api/users/imageupload', formData);
  }
  public partnerUploadImage(image: File) {
    console.log("http.service uploading partner image");
    const formData = new FormData();

    formData.append('image', image);

    return this._http.post('/api/partners/imageupload', formData);
  }
}
