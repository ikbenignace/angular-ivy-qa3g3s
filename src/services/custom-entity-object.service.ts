import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../services/base.service';
import { CustomEntityObject, CustomEntityObjectList } from '../models/customEntity/custom-entity-object';
import { CustomEntityEnum } from '../models/customEntity/custom-entity';

@Injectable({
  providedIn: 'root'
})
export class CustomEntityObjectService extends BaseService<CustomEntityObject, CustomEntityObjectList> {

  constructor(protected http: HttpClient, @Inject('BASE_URL') protected baseUrl: string) {
    super(http, baseUrl, 'CustomEntityObject');
  }



  create(entityId: CustomEntityEnum, accessKey: string): Observable<CustomEntityObject> {
    return this.http.post<CustomEntityObject>(this.baseUrl + this.controller + "/create/" + entityId + "/" + accessKey, null);
  }

}
