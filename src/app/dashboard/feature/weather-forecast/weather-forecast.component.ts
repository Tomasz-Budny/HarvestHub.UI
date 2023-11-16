import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DayForecastComponent } from '../../ui/day-forecast/day-forecast.component';
import { WeatherService } from '../../data-access/weather.service';
import { Observable } from 'rxjs';
import { DayForecastViewModel } from '../../data-model/day-forecast.model';

@Component({
  selector: 'app-weather-forecast',
  standalone: true,
  imports: [CommonModule, MatIconModule, DayForecastComponent],
  templateUrl: './weather-forecast.component.html',
  styleUrl: './weather-forecast.component.scss'
})
export class WeatherForecastComponent {
  dayForecasts: Observable<DayForecastViewModel[]>;

  constructor(
    public weatherService: WeatherService
  ) {
    this.dayForecasts = this.weatherService.getDayForecasts(53.0518, 20.703, 5);
  }

  forecasts = [
    { day: "PON", icon: 'sun', temperature: 22, rainForecast: 12 },
    { day: "WTO", icon: 'cloudy', temperature: 16, rainForecast: 17 },
    { day: "ŚRO", icon: 'little-cloudy', temperature: 18, rainForecast: 2 },
    { day: "CZW", icon: 'rainy', temperature: 9, rainForecast: 57 },
  ]
}
