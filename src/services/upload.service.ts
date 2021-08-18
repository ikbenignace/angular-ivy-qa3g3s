import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  controller = 'upload';

  constructor(protected http: HttpClient, @Inject('BASE_URL') protected baseUrl: string) {
  }


  upload(formData: FormData, folderName: string) {
    return this.http.post(this.baseUrl + this.controller + "/public?folder=" + folderName, formData);

  }

  uploadWithProgress(formData: FormData, folderName: string, accessKey: string, maxWidth: number = null): Observable<any> {
    return this.http.post(this.baseUrl + this.controller + "/public?folder=" + folderName + '&maxWidth=' + maxWidth +'&accessKey=' + accessKey, formData, { observe: 'events', reportProgress: true });
  }

}
