import { Injectable, Inject } from '@angular/core';
import { WaitingListMember, WaitingListMemberList, WaitingListMemberSavedResponse } from '../models/member/waiting-list-member';
import { BaseService } from './base.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StartSettingsThankYouPageContent } from '../models/startsettings/startSettingsThankYouPageContent';
import { StartSettingsIntroPageContent } from '../models/startsettings/startSettingsIntroPageContent';

@Injectable({
  providedIn: 'root'
})
export class WaitingListMemberService extends BaseService<WaitingListMember, WaitingListMemberList> {


  constructor(protected http: HttpClient, @Inject('BASE_URL') protected baseUrl: string) {
    super(http, baseUrl, 'waitingListMember');
  }

  save(member: WaitingListMember, accessKey: string): Observable<HttpResponse<string>> {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<HttpResponse<string>>(this.baseUrl + this.controller + "/public/" + accessKey, member)
    //return this.post("/public/" + accessKey, member);
  }

  saveWithPersonForm(member: WaitingListMember, accessKey: string, personFormKey: string): Observable<WaitingListMemberSavedResponse> {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<WaitingListMemberSavedResponse>(this.baseUrl + this.controller + "/public/" + accessKey + "?personFormKey=" + personFormKey, member)
    //return this.post("/public/" + accessKey, member);
  }

  getWaitingListThankYouPageContent(orgKey: string): Observable<StartSettingsThankYouPageContent> {
    return this.getCustomType<StartSettingsThankYouPageContent>("/waitingListThankYouPageContent?accessKey=" + orgKey);
  }

  getWaitingListIntroPageContent(orgKey: string): Observable<StartSettingsIntroPageContent> {
    return this.getCustomType<StartSettingsIntroPageContent>("/waitingListIntro?accessKey=" + orgKey);
  }


  getByKey(key: string, orgKey: string): Observable<WaitingListMember> {
    return this.get("/public/" + key + '?organisationKey=' + orgKey);
  }

}
