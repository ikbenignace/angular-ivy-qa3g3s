import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "./base.service";
import {Disabilities, Disability} from "../models/disability";
import {Observable} from "rxjs";
import {FormAnswerList} from "../models/form/form-answer";

@Injectable({
  providedIn: 'root'
})
export class DisabilityService extends BaseService<Disability, Disabilities> {

  constructor(protected http: HttpClient, @Inject('BASE_URL') protected baseUrl: string) {
    super(http, baseUrl, 'PersonDisability');
  }

  GetAll(key: string): Observable<Disabilities[]> {
    return this.getAll("/all?accessKey=" + key);
  }
}
