import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base.service';
import { FormDocument } from '../models/form/form-document';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormDocumentService extends BaseService<FormDocument, FormDocument> {


  constructor(protected http: HttpClient, @Inject('BASE_URL') protected baseUrl: string) {
    super(http, baseUrl, 'formdocument');
  }


  add(document: FormDocument, accessKey: string) {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    //return this.http.post<FormDocument>(this.baseUrl + this.controller + "/public/" + accessKey, document)
    return this.http.post(this.baseUrl + this.controller + "/public/" + accessKey, document);
  }

  submitDocument(documentKey: string, accessKey: string): Observable<boolean> {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<boolean>(this.baseUrl + this.controller + "/public/setFormAsSubmitted/" + accessKey + "/" + documentKey);
  }


}
