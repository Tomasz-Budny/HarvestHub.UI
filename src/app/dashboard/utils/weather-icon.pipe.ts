import { Pipe, PipeTransform } from '@angular/core';
import { WeatherStatus } from '../data-model/weather-status.model';

@Pipe({
  name: 'weatherIcon',
  standalone: true
})
export class WeatherIconPipe implements PipeTransform {

  transform(weatherStatus: WeatherStatus): string {
    switch(weatherStatus) {
      case WeatherStatus.Sunny:
        return 'sun';
      case WeatherStatus.Cloudy:
        return 'little-cloudy';
      case WeatherStatus.Overcast:
        return 'cloudy';
      case WeatherStatus.Rainy:
        return 'rainy';
      default:
        return 'unknown'
    }
  }

}
