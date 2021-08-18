import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from '../services/base.service';
import {CustomEntityField, CustomEntityFieldList} from '../models/customEntity/custom-entity-field';
import {CustomEntityEnum} from '../models/customEntity/custom-entity';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomEntityFieldService extends BaseService<CustomEntityField, CustomEntityFieldList> {


  constructor(protected http: HttpClient, @Inject('BASE_URL') protected baseUrl: string) {
    super(http, baseUrl, 'CustomEntityField');
  }

  getAllByEntity(entityId: number, accessKey: string): Observable<CustomEntityFieldList[]> {
    return this.getAll('/byEntity/' + entityId.toString() + '/' + accessKey).pipe(
      map(fields => fields.sort((a: CustomEntityFieldList, b: CustomEntityFieldList) =>
        (a.CustomEntityPartId - b.CustomEntityPartId  || a.ListOrder - b.ListOrder))
      )
    );
  }

  getAllDefaultByEntity(entityId: number, accessKey: string): Observable<CustomEntityFieldList[]> {
    return this.getAll('/byEntity/' + entityId.toString() + '/' + accessKey).pipe(
      map(fields => fields.filter(item => this.checkNotNull(item.CustomEntityDefaultField)).sort((a: CustomEntityFieldList, b: CustomEntityFieldList) =>
        (a.CustomEntityDefaultField.ListOrder - b.CustomEntityDefaultField.ListOrder))
      )
    );
  }

  checkNotNull(item) {
    return item != null
  }
}
