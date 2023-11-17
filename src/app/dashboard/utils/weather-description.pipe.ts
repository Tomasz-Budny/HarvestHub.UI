import { Pipe, PipeTransform } from '@angular/core';
import { WeatherStatus } from '../data-model/weather-status.model';

@Pipe({
  name: 'weatherDescription',
  standalone: true
})
export class WeatherDescriptionPipe implements PipeTransform {

  transform(weatherStatus: WeatherStatus): string {
    switch(weatherStatus) {
      case WeatherStatus.Sunny:
        return 'Słonecznie';
      case WeatherStatus.Cloudy:
        return 'Pochmurnie';
      case WeatherStatus.Overcast:
        return 'Zachmurzenie';
      case WeatherStatus.Rainy:
        return 'Deszczowo';
      default:
        return 'Nieznane'
    }
  }

}
