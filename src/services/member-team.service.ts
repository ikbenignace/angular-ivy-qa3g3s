import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MemberTeam, MemberTeamList, MemberTeamName } from '../models/member/member-team';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberTeamService extends BaseService<MemberTeam, MemberTeamList> {


  constructor(protected http: HttpClient, @Inject('BASE_URL') protected baseUrl: string) {
    super(http, baseUrl, 'MemberTeams');
  }

  getTeamNames(accessKey: string): Observable<MemberTeamName> {
    return this.getCustomType<MemberTeamName>("/GetTeamNames?accessKey=" + accessKey);
  }

  getAllForWaitingList(accessKey: string): Observable<MemberTeamList[]> {
    return this.getAll("/forWaitingList?accessKey=" + accessKey);
  }

}
