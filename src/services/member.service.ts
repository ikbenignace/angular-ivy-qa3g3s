import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../services/base.service';

import { MemberPublic, Member } from '../models/member/member';


@Injectable({
  providedIn: 'root'
})
export class MemberService extends BaseService<Member, MemberPublic> {


  constructor(protected http: HttpClient, @Inject('BASE_URL') protected baseUrl: string) {
    super(http, baseUrl, 'member');
  }

  getByKey(key: string, orgKey: string): Observable<MemberPublic> {
    return this.get("/public/" + key + '?organisationKey=' + orgKey);
  }

  getByKeyForReview(key: string, orgKey: string): Observable<MemberPublic> {
    return this.get("/public/" + key + '/forReview?organisationKey=' + orgKey);
  }
  

  getAccessKeyByWaitinglistMemberAccessKey(key: string, orgKey: string): Observable<string> {
    return this.getCustomType<string>("/public/key/fromwaitinglist/" + key + '?organisationKey=' + orgKey);
  }


  pay(key: string, orgKey: string, returnUrl: string): Observable<string> {
    return this.http.get<string>(this.baseUrl + this.controller + "/public/" + key + '/pay?organisationKey=' + orgKey + '&returnUrl=' + returnUrl)
      .pipe(
        catchError(this.handleError<string>())
      );
  }

}
