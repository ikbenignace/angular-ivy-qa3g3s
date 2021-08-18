import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../services/base.service';

import { WeatherForecast } from '../models/weather-forecast';


@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService extends BaseService<WeatherForecast, WeatherForecast> {

  constructor(protected http: HttpClient, @Inject('BASE_URL') protected baseUrl: string) {
    super(http, baseUrl, 'isocountry');
  }

}
