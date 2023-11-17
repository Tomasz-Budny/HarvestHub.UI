import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DayForecastComponent } from '../../ui/day-forecast/day-forecast.component';
import { WeatherService } from '../../data-access/weather.service';
import { Observable } from 'rxjs';
import { DayForecastViewModel } from '../../data-model/day-forecast.model';
import { WeatherIconPipe } from '../../utils/weather-icon.pipe';
import { WeekDayPipe } from '../../utils/week-day.pipe';
import { WeatherDescriptionPipe } from '../../utils/weather-description.pipe';
import { DayForecastSkeletonComponent } from '../../ui/day-forecast-skeleton/day-forecast-skeleton.component';
import { OwnerService } from '../../data-access/owner.service';
import { AddressViewModel } from '../../data-model/address.model';

@Component({
  selector: 'app-weather-forecast',
  standalone: true,
  imports: [CommonModule, MatIconModule, DayForecastComponent, WeatherIconPipe, WeekDayPipe, WeatherDescriptionPipe, DayForecastSkeletonComponent],
  templateUrl: './weather-forecast.component.html',
  styleUrl: './weather-forecast.component.scss'
})
export class WeatherForecastComponent {
  dayForecasts: Observable<DayForecastViewModel[]>;
  address: Signal<AddressViewModel>;

  constructor(
    public weatherService: WeatherService,
    public ownerService: OwnerService
  ) {
    this.address = this.ownerService.getAddress();

    const coordinates = this.ownerService.getCoordinates();

    this.dayForecasts = this.weatherService.getDayForecasts(coordinates().lat, coordinates().lng, 5);
  }
}
