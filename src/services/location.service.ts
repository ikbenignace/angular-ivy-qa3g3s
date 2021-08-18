import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../services/base.service';

import { Location } from '../models/location/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService extends BaseService<Location, Location> {


  constructor(protected http: HttpClient, @Inject('BASE_URL') protected baseUrl: string) {
    super(http, baseUrl, 'location');
  }

  getlocationByPostcode(postcode: string): Observable<Location> {
    return this.get("/getlocationByPostcode?postcode=" + postcode)
  }

}
