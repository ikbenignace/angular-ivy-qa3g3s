import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base.service';
import { FormAnswer, FormAnswerList } from '../models/form/form-answer';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormAnswerService extends BaseService<FormAnswer, FormAnswerList> {

  constructor(protected http: HttpClient, @Inject('BASE_URL') protected baseUrl: string) {
    super(http, baseUrl, 'formanswer');
  }

  GetAllByDocument(documentKey: string, key: string): Observable<FormAnswerList[]> {
    return this.getAll("/byDocument/" + documentKey + "?organizationKey=" + key);
  }

}
