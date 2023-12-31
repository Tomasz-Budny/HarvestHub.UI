import { Component, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DayForecastComponent } from '../../ui/day-forecast/day-forecast.component';
import { WeatherService } from '../../data-access/weather.service';
import { EMPTY, Observable, Subject, switchMap } from 'rxjs';
import { DayForecastViewModel } from '../../data-model/day-forecast.model';
import { WeatherIconPipe } from '../../utils/weather-icon.pipe';
import { WeekDayPipe } from '../../utils/week-day.pipe';
import { WeatherDescriptionPipe } from '../../utils/weather-description.pipe';
import { DayForecastSkeletonComponent } from '../../ui/day-forecast-skeleton/day-forecast-skeleton.component';
import { OwnerService } from '../../data-access/owner.service';
import { AddressViewModel } from '../../data-model/address.model';
import { HarvestHubResponse } from '../../../shared/data-model/harvest-hub-response.model';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-weather-forecast',
  standalone: true,
  imports: [CommonModule, MatIconModule, DayForecastComponent, WeatherIconPipe, WeekDayPipe, WeatherDescriptionPipe, DayForecastSkeletonComponent],
  templateUrl: './weather-forecast.component.html',
  styleUrl: './weather-forecast.component.scss'
})
export class WeatherForecastComponent {
  dayForecasts: Signal<HarvestHubResponse<DayForecastViewModel[]>> = this.weatherService.dayForecastsState;
  address: Signal<AddressViewModel> = computed(() => this.ownerService.startLocation().address);
  error = this.ownerService.error;
  startLocationChange$ = toObservable(this.ownerService.startLocation);

  constructor(
    public weatherService: WeatherService,
    public ownerService: OwnerService
  ) {
    this.startLocationChange$.pipe(
      takeUntilDestroyed()
    ).subscribe(data => {
      if(!data) {
        return;
      }
      this.weatherService.loadDayForecasts(data.coordinates, 5);
    })
  }
}
