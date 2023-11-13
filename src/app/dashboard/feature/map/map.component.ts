import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { MapService } from '../../data-access/map.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, HttpClientModule, HttpClientJsonpModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  private googleMap: GoogleMap;
  @ViewChild(GoogleMap) set map(content: GoogleMap) {
    if(content) {
      this.googleMap = content;
      this.mapService.map.next(this.googleMap)
    }
  }
  apiLoaded: Observable<boolean>;
  options: google.maps.MapOptions;
  center: google.maps.LatLngLiteral;

  constructor(
    public httpClient: HttpClient,
    public mapService: MapService
  ) { 
    this.apiLoaded = this.httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyBuKv27xR4mZj_nWp6ljbbo0x_ta0yrui4&libraries=places', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
          tap({
            complete: () => this.initializeMap()
          })
        );
  }

  initializeMap() {
    this.options = {
      disableDefaultUI: true,
      fullscreenControl: false,
      mapTypeId: google.maps.MapTypeId.HYBRID,
    }
    this.center = {lat: 53.0518, lng: 20.703};
  }
}
