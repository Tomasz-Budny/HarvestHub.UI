import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable, Signal, computed, signal } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { BehaviorSubject, EMPTY, Observable, Subject, catchError, combineLatest, map, of, pipe, switchMap, take, withLatestFrom } from 'rxjs';
import { CoordinatesViewModel } from '../data-model/coordinates.model';
import { FieldsService } from './fields.service';
import { Polygon } from '../data-model/polygon.model';
import { FieldViewModel } from '../data-model/field.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private isLoaded: boolean = false;
  private map: Subject<GoogleMap> = new Subject<GoogleMap>();
  drawingManager: any;
  editingFieldPolygon: any;
  private editingField = signal<{polygon, fieldId: string}>({
    polygon: null,
    fieldId: ''
  });
  editingFieldId: Signal<string> = computed(() => this.editingField().fieldId);
  private focusOnField$ = new Subject<FieldViewModel>();
  private focus$ = new Subject<CoordinatesViewModel>();
  private initializeSearchBar$ = new Subject<ElementRef>();
  private addNewField$ = new Subject<void>();
  private initializeEditPolygonBorders$ = new Subject<FieldViewModel>();
  private setMapControls$: Subject<ElementRef> = new Subject<ElementRef>();
  private changeStartLocationToggle$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private changeStartLocation$: Subject<CoordinatesViewModel> = new Subject();
  public get changeStartLocation(): Observable<CoordinatesViewModel> {
    return this.changeStartLocation$.asObservable();
  }
  public get isStartLocationEditing(): Observable<boolean> {
    return this.changeStartLocationToggle$.asObservable()
  }

  constructor(
    public httpClient: HttpClient,
    private fieldService: FieldsService 
  ) { 
    this.changeStartLocationToggle$.pipe(
      takeUntilDestroyed(),
      withLatestFrom(this.map)
    ).subscribe(([isInitialied, map]) => {
      if(isInitialied) {
        map.googleMap.setOptions({draggableCursor:'pointer, default'});
        google.maps.event.addListener(map.googleMap, 'click', (e) => {
          this.changeStartLocation$.next(e.latLng.toJSON());
          this.changeStartLocationToggle$.next(false);
        });
      } else {
        map.googleMap.setOptions({draggableCursor:null});
        google.maps.event.clearListeners(map.googleMap, 'click');
      }
    })

    this.setMapControls$.pipe(
      takeUntilDestroyed(),
      switchMap(elementRef => {
        return this.map.pipe(map(map => ({elementRef: elementRef, map: map})))
      }),
    ).subscribe(({elementRef, map}) => {
      if(!map) {
        return;
      }
      map.controls[google.maps.ControlPosition.TOP_RIGHT].clear();
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(
        elementRef.nativeElement,
      );
    });

    combineLatest([
      this.focus$.asObservable(),
      this.map,
    ]).pipe(
      takeUntilDestroyed()
    ).subscribe(([coords, map]) => {
      map.googleMap.setCenter(coords);
      map.googleMap.setZoom(17);
    })

    this.focusOnField$.pipe(
      withLatestFrom(this.map),
      takeUntilDestroyed(),
    ).subscribe(([field, map]) => {
      map.googleMap.setCenter(field.center);
      let zoom = 17;

      if(field.area < 15000) {
        zoom = 19;
        map.googleMap.setZoom(zoom);
        return;
      }

      if(field.area < 50000) {
        zoom = 18;
        map.googleMap.setZoom(zoom);
        return;
      }
      map.googleMap.setZoom(zoom);
    });

    combineLatest([
      this.initializeSearchBar$,
      this.map
    ]).subscribe(([searchBar, map]) => {
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
    });

    this.addNewField$.pipe(
      withLatestFrom(this.map),
      takeUntilDestroyed(),
    ).subscribe(([_, map]) => {
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
    });

    this.initializeEditPolygonBorders$.pipe(
      withLatestFrom(this.map),
      takeUntilDestroyed(),
    ).subscribe(([field, map]) => {
      this.discardPolygonBordersEditing();
      const polygon = new google.maps.Polygon({
        paths: field.paths,
        editable: true,
        fillColor: field.color,
        fillOpacity: 0.5
      });
  
      polygon.setMap(map.googleMap);
  
      this.editingField.set({
        polygon: polygon,
        fieldId: field.id
      });
    });
  }

  setMapControls(elementRef: ElementRef) {
    this.setMapControls$.next(elementRef);
  }

  loadMap(): Observable<boolean> {
    return of(null).pipe(
      switchMap(_ => {
        if(this.isLoaded) {
          return of(true);
        }

        return this.httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyBuKv27xR4mZj_nWp6ljbbo0x_ta0yrui4&libraries=places,geometry,drawing', 'callback').pipe(
          map(() => { this.isLoaded = true; return true; }),
          catchError(() => of(false))
        )
      })
    )
  }

  changeStartLocationToggle() {
    this.changeStartLocationToggle$.next(!this.changeStartLocationToggle$.value);
  }

  focus(coords: CoordinatesViewModel) {
    this.focus$.next(coords);
  }

  focusOnField(field: FieldViewModel) {
    this.focusOnField$.next(field);
  }

  setMapInstance(map: GoogleMap): void {
    this.map.next(map);
  }

  initializeSearchBar(searchBar: ElementRef): void {
    this.initializeSearchBar$.next(searchBar);
  }

  addNewField() {
    this.addNewField$.next();
  }

  discardAddingPolygon() {
    if(this.drawingManager) {
      (<google.maps.drawing.DrawingManager>this.drawingManager).setMap(null);
    }
  }

  initializeEditPolygonBorders(field: FieldViewModel) {
    this.initializeEditPolygonBorders$.next(field);
  }

  editPolygonBorders() {
    const editingPolygon = this.editingField();

    if(editingPolygon.fieldId !== '') {
      const fieldId = editingPolygon.fieldId;
      const coords = this.getCoordinates(editingPolygon.polygon.getPath());
      const area = this.calculateArea(coords);
      const center = this.calculateCenter(coords);

      const polygon: Polygon = {
        vertices: coords,
        area: area,
        center: center
      };

      this.fieldService.replaceFieldVertices$.next({
        polygon: polygon,
        fieldId: fieldId
      });

      this.discardPolygonBordersEditing()
    }
  }

  discardPolygonBordersEditing() {
    if(this.editingField().polygon) {
      this.editingField().polygon.setMap(null);
    }
    this.editingField.set({
      polygon: null,
      fieldId: ''
    });
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
