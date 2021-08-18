import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivityList } from '../models/activity/activity';
import { BaseService } from './base.service';
import { PersonActivity } from '../models/activity/person-activity';

@Injectable({
  providedIn: 'root'
})
export class PersonActivityService extends BaseService<PersonActivity, PersonActivity> {

  constructor(protected http: HttpClient, @Inject('BASE_URL') protected baseUrl: string) {
    super(http, baseUrl, 'personactivity');
  }


  add(pa: PersonActivity, accessKey: string): Observable<any> {
    return this.post("/add?accessKey=" + accessKey, pa);
  }

  addForWaitingListMember(pa: PersonActivity, waitinglistKey: string, accessKey: string): Observable<any> {
    return this.post("/addWaitinglistMember?accessKey=" + accessKey + "&waitinglistKey=" + waitinglistKey, pa);
  }

  getByPerson(personaccessKey: string, accessKey: string): Observable<PersonActivity[]> {
    return this.getAll("/public/byPerson/" + personaccessKey + "?accessKey=" + accessKey);
  }

}
