import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base.service';
import { FormPage, FormPageList } from '../models/form/form-page';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormQuestion, FormQuestionList } from '../models/form/form-question';

@Injectable({
  providedIn: 'root'
})
export class FormQuestionService extends BaseService<FormQuestion, FormQuestionList> {


  constructor(protected http: HttpClient, @Inject('BASE_URL') protected baseUrl: string) {
    super(http, baseUrl, 'formQuestion');
  }






}
