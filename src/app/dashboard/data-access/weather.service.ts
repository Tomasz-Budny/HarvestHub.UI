import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    public http: HttpClient
  ) { }

  getDayForecasts(latitude: number, longitude: number, days: number) {
    
  }
}
