import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

import { OrganizationPublic } from '../models/organization';
import {StartSettings} from "../models/startsettings/start-settings";
@Injectable({
  providedIn: 'root'
})
export class StartSettingsService extends BaseService<StartSettings, StartSettings> {


  constructor(protected http: HttpClient, @Inject('BASE_URL') protected baseUrl: string) {
    super(http, baseUrl, 'startsettings');
  }

  getForOrganisationByKey(key: string): Observable<StartSettings> {
    return this.get("/forOrganisation?accessKey=" + key);
  }

  getForOrganisation(): Observable<StartSettings> {
    return this.get("/current");
  }
}
