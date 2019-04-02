import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private _http: HttpClient) { }

  public uploadImage(image: File) {
    const formData = new FormData();

    formData.append('image', image);

    return this._http.post('/api/imageupload', formData);
  }
}
