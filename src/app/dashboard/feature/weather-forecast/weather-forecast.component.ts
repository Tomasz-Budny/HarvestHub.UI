import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DayForecastComponent } from '../../ui/day-forecast/day-forecast.component';
import { WeatherService } from '../../data-access/weather.service';
import { Observable } from 'rxjs';
import { DayForecastViewModel } from '../../data-model/day-forecast.model';
import { WeatherIconPipe } from '../../utils/weather-icon.pipe';
import { WeekDayPipe } from '../../utils/week-day.pipe';
import { WeatherDescriptionPipe } from '../../utils/weather-description.pipe';

@Component({
  selector: 'app-weather-forecast',
  standalone: true,
  imports: [CommonModule, MatIconModule, DayForecastComponent, WeatherIconPipe, WeekDayPipe, WeatherDescriptionPipe],
  templateUrl: './weather-forecast.component.html',
  styleUrl: './weather-forecast.component.scss'
})
export class WeatherForecastComponent {
  dayForecasts: Observable<DayForecastViewModel[]>;

  constructor(
    public weatherService: WeatherService
  ) {
    //this.dayForecasts = this.weatherService.getDayForecasts(53.0518, 20.703, 5);
    this.dayForecasts = this.weatherService.getDayForecasts(0, 0, 5);
  }
}
