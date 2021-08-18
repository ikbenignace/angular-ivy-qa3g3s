import { Injectable, Inject } from '@angular/core';
import { TranslationTextBasic, TranslationTextList } from '../models/translation-text';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationTextService extends BaseService<TranslationTextBasic, TranslationTextBasic> {


  constructor(protected http: HttpClient, @Inject('BASE_URL') protected baseUrl: string) {
    super(http, baseUrl, 'TranslationText');
  }

  getAllByPage(page: string, accessKey: string): Observable<TranslationTextBasic[]> {
    return this.getAll("/byPage/" + page + "?accessKey=" + accessKey);
  }


  getAllByEntity(entityId: number, accessKey: string): Observable<TranslationTextBasic[]> {
    return this.getAll("/byEntity/" + entityId + "?accessKey=" + accessKey);
  }

}
