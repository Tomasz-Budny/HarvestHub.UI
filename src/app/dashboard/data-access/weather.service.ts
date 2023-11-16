import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DayForecastViewModel } from '../data-model/day-forecast.model';
import { NEVER, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  URL = "https://localhost:7258/api/weather/";

  constructor(
    public http: HttpClient
  ) { }

  getDayForecasts(latitude: number, longitude: number, days: number): Observable<DayForecastViewModel[]> {
    const params = new HttpParams()
      .set('latitude', latitude)
      .set('longitude', longitude)
      .set('days', days);

    // return this.http.get<DayForecastViewModel[]>(this.URL + 'day_forecast', { params })

    return NEVER;
  }
}
