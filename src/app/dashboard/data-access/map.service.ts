import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { CoordinatesViewModel } from '../data-model/coordinates.model';
import { FieldsService } from './fields.service';
import { Polygon } from '../data-model/polygon.model';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map: BehaviorSubject<GoogleMap> = new BehaviorSubject<GoogleMap>(null);
  drawingManager;
  constructor(
    public httpClient: HttpClient,
    private fieldService: FieldsService 
  ) { }

  loadMap(): Observable<boolean> {
    return this.httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyBuKv27xR4mZj_nWp6ljbbo0x_ta0yrui4&libraries=places,geometry,drawing', 'callback')
    .pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  focus(coords: CoordinatesViewModel) {
    this.map.subscribe(map => {
      if(!map) {
        return;
      }
      map.googleMap.setCenter(coords);
      map.googleMap.setZoom(17);
    })
  }

  setMapInstance(map: GoogleMap): void {
    this.map.next(map);
  }

  initializeSearchBar(searchBar: ElementRef): void {
    this.map.subscribe(map => {
      if(!map) {
        return;
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

  addNewField() {
    this.map.subscribe(map => {
      if(!map) {
        return;
      }

      const drawingManagerOptions = {
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: false,
        polygonOptions: {
          draggable: true,
          editable: true,
        },
      };

      const DrawingManager = new google.maps.drawing.DrawingManager(drawingManagerOptions);

      DrawingManager.setMap(map.googleMap);
  
      this.drawingManager = DrawingManager;

      google.maps.event.addListener(DrawingManager, 'overlaycomplete', (event)=> {
        DrawingManager.setMap(null);
        const path = event.overlay.getPath();
        const coords = this.getCoordinates(path)
        const area = this.calculateArea(coords);
        const center = this.calculateCenter(coords);

        const polygon: Polygon = {
          vertices: coords,
          area: area,
          center: center
        };

        this.fieldService.add$.next(polygon);

        event.overlay.setMap(null)
      })
    })
  }

  discardAddingPolygon() {
    (<google.maps.drawing.DrawingManager>this.drawingManager).setMap(null);
  }
  
  private getCoordinates(path): CoordinatesViewModel[] {
    const pointList = [];
    const len = path.getLength();
    for (let i = 0; i < len; i++) {
      pointList.push(
        path.getAt(i).toJSON()
      );
    }
    return pointList;
  }

  private calculateArea(coords: CoordinatesViewModel[]) {
    return google.maps.geometry.spherical.computeArea(coords);
  }

  private calculateCenter(coords: CoordinatesViewModel[]): CoordinatesViewModel {
    let x1 = coords[0].lat;
    let x2 = coords[0].lat;
    let y1 = coords[0].lng;
    let y2 = coords[0].lng;

    coords.forEach(vertice => {
        if(vertice.lat < x1) {
            x1 = vertice.lat;
        }
        if(vertice.lat > x2) {
            x2 = vertice.lat
        }

        if(vertice.lng < y1) {
            y1 = vertice.lng;
        }
        if(vertice.lng > y2) {
            y2 = vertice.lng
        }
    })

    const xCenter = x1 + ((x2 - x1) / 2);
    const yCenter = y1 + ((y2 - y1) / 2);

    return {lat: xCenter, lng: yCenter}
  }
}
