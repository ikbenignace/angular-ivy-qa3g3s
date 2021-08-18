import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormList } from '../models/form/form';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class FormService extends BaseService<FormList, FormList> {

  constructor(protected http: HttpClient, @Inject('BASE_URL') protected baseUrl: string) {
    super(http, baseUrl, 'form');
  }


  getByIdAndKey(formId: number, formKey: string, key: string): Observable<FormList> {
    return this.get("/public/" + formId + "/" + formKey + "?accesskey=" + key);
  }

  hasAccess(formId: number, formKey: string, key: string): Observable<boolean> {
    return this.http.get<boolean>(this.baseUrl + this.controller + "/public/hasAccess/" + formId + "/" + formKey + "?accesskey=" + key);
  }

}
