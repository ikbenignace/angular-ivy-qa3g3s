import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from '../services/base.service';
import {CustomEntity, CustomEntityEnum, CustomEntityList} from '../models/customEntity/custom-entity';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomEntityService extends BaseService<CustomEntity, CustomEntityList> {


  constructor(protected http: HttpClient, @Inject('BASE_URL') protected baseUrl: string) {
    super(http, baseUrl, 'CustomEntity');
  }

  getPublic(entityId: number, accessKey: string): Observable<CustomEntity> {
    return this.get('/' + entityId.toString() + '/' + accessKey);
  }
}
