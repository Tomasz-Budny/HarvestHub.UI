import { ElementRef, Injectable } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: Subject<GoogleMap> = new Subject<GoogleMap>();

  constructor() { }

  initializeSearchBar(searchBar: ElementRef) {
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
