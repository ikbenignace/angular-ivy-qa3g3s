import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonForm, PersonFormList } from '../models/Person/person-form';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PersonFormService extends BaseService<PersonForm, PersonFormList> {

  constructor(protected http: HttpClient, @Inject('BASE_URL') protected baseUrl: string) {
    super(http, baseUrl, 'personForm');
  }


  getByKey(key: string, accessKey: string): Observable<PersonForm> {
    return this.get("/public/" + key + "?accessKey=" + accessKey);
  }

}
