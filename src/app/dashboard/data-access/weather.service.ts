import { Injectable, Signal, computed, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DayForecastViewModel } from '../data-model/day-forecast.model';
import { Observable, switchMap } from 'rxjs';
import { OwnerService } from './owner.service';
import { HarvestHubResponse } from '../../shared/data-model/harvest-hub-response.model';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private dayForecastsState = signal<HarvestHubResponse<DayForecastViewModel[]>>({
    data: null,
    loaded: false,
    error: null
  });

  getDayForecasts(days: number): Signal<HarvestHubResponse<DayForecastViewModel[]>> {
    this.loadDayForecasts(days).subscribe({
      next: res => this.dayForecastsState.update(state => ({
        ...state,
        data: res,
        loaded: true
      })),
      error: err => this.dayForecastsState.update(state => ({
        ...state,
        error: err
      }))
    })
    return this.dayForecastsState.asReadonly()
  }

  URL = "https://localhost:7258/api/weather/";

  constructor(
    public http: HttpClient,
    public ownerService: OwnerService
  ) { }

  private loadDayForecasts(days: number): Observable<DayForecastViewModel[]> {
    return this.ownerService.loadStartLocation().pipe(
      switchMap(startLocation => {
        const params = new HttpParams()
          .set('latitude', startLocation.coordinates.lat)
          .set('longitude', startLocation.coordinates.lng)
          .set('days', days);

        return this.http.get<DayForecastViewModel[]>(this.URL + 'day_forecast', { params });
      }),
      takeUntilDestroyed()
    )
  }
}
