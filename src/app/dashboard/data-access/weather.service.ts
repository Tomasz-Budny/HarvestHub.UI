import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DayForecastViewModel } from '../data-model/day-forecast.model';
import { Observable, Subject, switchMap, tap } from 'rxjs';
import { HarvestHubResponse } from '../../shared/data-model/harvest-hub-response.model';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CoordinatesViewModel } from '../data-model/coordinates.model';
import { AuthService } from '../../auth/data-access/auth.service';
import { BaseUrlService } from '../../shared/data-access/base-url.service';
import { RandomUtil } from '../utils/random.util';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  URL = this.baseUrlService.createUrl('weather/');

  private getDayForecasts$: Subject<{coords: CoordinatesViewModel, days: number}> = new Subject();

  public dayForecastsState = signal<HarvestHubResponse<DayForecastViewModel[]>>({
    data: null,
    loaded: false,
    error: null
  });

  constructor(
    public http: HttpClient,
    private authService: AuthService,
    private baseUrlService: BaseUrlService
  ) {
    this.authService.beforeLogout$.pipe(
      takeUntilDestroyed()
    ).subscribe(_ => this.dayForecastsState.set({
      data: [],
      loaded: false,
      error: null
    }));
    
    this.getDayForecasts$.pipe(
      takeUntilDestroyed(),
      switchMap(data => this.loadDayForecastsApi(data.coords, data.days))
    ).subscribe({
      next: res => this.dayForecastsState.update(state => ({
        ...state,
        data: this.tryFillFakeWeatherData(res),
        loaded: true
      })),
      error: err => this.dayForecastsState.update(state => ({
        ...state,
        error: err
      }))
    })
  }

  public loadDayForecasts(coords: CoordinatesViewModel, days: number) {
    this.getDayForecasts$.next({
      coords: coords,
      days: days
    });
  }

  private loadDayForecastsApi(coords: CoordinatesViewModel, days: number): Observable<DayForecastViewModel[]> {
    const params = new HttpParams()
      .set('latitude', coords.lat)
      .set('longitude', coords.lng)
      .set('days', days);

    return this.http.get<DayForecastViewModel[]>(this.URL + 'day_forecast', { params });
  }

  private tryFillFakeWeatherData(dayForecasts: DayForecastViewModel[]): DayForecastViewModel[] {
    const desiredNumberOfForecastDays = 5;

    let lastWeekDay = dayForecasts[dayForecasts.length - 1].weekDay;

    if(dayForecasts.length < desiredNumberOfForecastDays) {

      const iterations = desiredNumberOfForecastDays - dayForecasts.length;

      for(let i = 0; i < iterations; i++) {
        lastWeekDay = lastWeekDay + 1 % 7;

        var artificialForecastday: DayForecastViewModel = {
          temperature: RandomUtil.getRandomRange(0, 2),
          weekDay: lastWeekDay,
          weatherStatus: RandomUtil.getRandomRange(1, 4),
          rainChances: RandomUtil.getRandomRange(0, 100)
        };

        dayForecasts.push(artificialForecastday)
      }

    }

    return dayForecasts;
  }
}
