import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base.service';
import { FormPage, FormPageList } from '../models/form/form-page';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormAnswerList } from '../models/form/form-answer';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormPageService extends BaseService<FormPage, FormPageList> {


  constructor(protected http: HttpClient, @Inject('BASE_URL') protected baseUrl: string) {
    super(http, baseUrl, 'formpage');
  }


  getAllByFormKey(formId: number, formKey: string): Observable<FormPageList[]> {
    return this.getAll("/public/byFormKey?formId=" + formId + "&formKey=" + formKey)
  }


  savePageAnswers(formPageId: number, documentkey: string, answers: FormAnswerList[], accessKey: string) {
    return this.http.post(this.baseUrl + this.controller + "/public/answers/" + accessKey, { FormPageId: formPageId, DocumentKey: documentkey, Answers: answers })
      .pipe(
        catchError(this.handleError<FormAnswerList>())
      );
  }

}
