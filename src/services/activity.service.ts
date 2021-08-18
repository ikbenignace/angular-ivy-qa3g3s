import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Activity, ActivityList } from '../models/activity/activity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService extends BaseService<Activity, ActivityList> {

  constructor(protected http: HttpClient, @Inject('BASE_URL') protected baseUrl: string) {
    super(http, baseUrl, 'activity');
  }


  getAllSubscribableForMember(memberKey: string, accessKey: string): Observable<ActivityList[]> {
    return this.getAll("/public/byMember/" + memberKey + "?accessKey=" + accessKey);
  }
  getAllSubscribableForWaitingListMember(memberKey: string, accessKey: string): Observable<ActivityList[]> {
    return this.getAll("/public/byWaitingListMember/" + memberKey + "?accessKey=" + accessKey);
  }
  

}
