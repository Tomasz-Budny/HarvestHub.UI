import { AsyncPipe } from '@angular/common';
import { HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { Observable, catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule, HttpClientModule, HttpClientJsonpModule, AsyncPipe],
  templateUrl: './map.component.html'
})
export class MapComponent {
  apiLoaded: Observable<boolean>;

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyBuKv27xR4mZj_nWp6ljbbo0x_ta0yrui4', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
  }
}
