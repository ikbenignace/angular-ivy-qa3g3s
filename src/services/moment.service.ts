import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Moment, MomentList } from '../models/moment/moment';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class MomentService extends BaseService<Moment, MomentList>{


  constructor(protected http: HttpClient, @Inject('BASE_URL') protected baseUrl: string) {
    super(http, baseUrl, 'Moment');
  }

  GetAllByMember(memberKey: string, accessKey: string): Observable<MomentList[]> {
    return this.getCustomType<MomentList[]>("/public/byMember/" + memberKey +"/all?accessKey=" + accessKey);
  }

  GetAllPastByMember(memberKey: string, accessKey: string): Observable<MomentList[]> {
    return this.getCustomType<MomentList[]>("/public/byMember/" + memberKey + "/past?accessKey=" + accessKey);
  }


  GetAllFutureByMember(memberKey: string, accessKey: string): Observable<MomentList[]> {
    return this.getCustomType<MomentList[]>("/public/byMember/" + memberKey + "/future?accessKey=" + accessKey);
  }
   
}
