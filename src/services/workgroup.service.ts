import { Injectable, Inject } from '@angular/core';
import { WaitingListMember, WaitingListMemberList } from '../models/member/waiting-list-member';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkGroup } from '../models/Person/workgroup';

@Injectable({
  providedIn: 'root'
})
export class WorkgroupService extends BaseService<WorkGroup, WorkGroup> {


  constructor(protected http: HttpClient, @Inject('BASE_URL') protected baseUrl: string) {
    super(http, baseUrl, 'workgroup');
  }


  getForWaitinglist(orgKey: string): Observable<WorkGroup[]> {
    return this.getAll("/public/waitinglist?accessKey=" + orgKey);
  }

}
