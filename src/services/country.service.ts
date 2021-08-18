import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../services/base.service';

import { IsoCountry } from '../models/location/IsoCountry';

@Injectable({
  providedIn: 'root'
})
export class CountryService extends BaseService<IsoCountry, IsoCountry> {


  constructor(protected http: HttpClient, @Inject('BASE_URL') protected baseUrl: string) {
    super(http, baseUrl, 'isocountry');
  }

  getAllPublic(orderby?: string): Observable<IsoCountry[]> {
    return this.http.get<IsoCountry[]>(this.baseUrl + this.controller + "/public?orderby=" + orderby)
      .pipe(
        catchError(this.handleError<IsoCountry[]>([]))
      );
  }

}
