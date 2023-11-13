import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Observable, Subject, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map: Subject<GoogleMap> = new Subject<GoogleMap>();

  constructor(
    public httpClient: HttpClient,
  ) { }

  loadMap(): Observable<boolean> {
    return this.httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyBuKv27xR4mZj_nWp6ljbbo0x_ta0yrui4&libraries=places', 'callback')
    .pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  setMapInstance(map: GoogleMap): void {
    this.map.next(map);
  }

  initializeSearchBar(searchBar: ElementRef): void {
    this.map.subscribe(map => {
      if(!map) {
        throw new Error("map is not initialized!")
      }

      const searchBox = new google.maps.places.SearchBox(
        searchBar.nativeElement,
      );
  
      searchBox.addListener('places_changed', ()=> {
        const places = searchBox.getPlaces();
        if(places.length === 0) {
          return;
        }
        const bounds = new google.maps.LatLngBounds();
        places.forEach(place => {
          if(!place.geometry || !place.geometry.location) {
            return;
          }
          if(place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
          map.fitBounds(bounds);
        })
      })
    })
  }
}
