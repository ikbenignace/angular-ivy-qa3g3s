import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../services/base.service';

import { OrganizationPublic } from '../models/organization';
@Injectable({
  providedIn: 'root'
})
export class OrganizationService extends BaseService<OrganizationPublic, OrganizationPublic> {


  constructor(protected http: HttpClient, @Inject('BASE_URL') protected baseUrl: string) {
    super(http, baseUrl, 'organization');
  }

  getByKey(key: string): Observable<OrganizationPublic> {
    return this.get("/bykey/" + key);
  }
}
