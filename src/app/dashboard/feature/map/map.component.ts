import { CommonModule } from '@angular/common';
import { Component, Signal, ViewChild, computed } from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { Observable, tap } from 'rxjs';
import { MapService } from '../../data-access/map.service';
import { FieldsService } from '../../data-access/fields.service';
import { FieldViewModel } from '../../data-model/field.model';
import { HarvestHubResponse } from '../../../shared/data-model/harvest-hub-response.model';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  private googleMap: GoogleMap;
  @ViewChild(GoogleMap) set map(content: GoogleMap) {
    if(content) {
      this.googleMap = content;
      this.mapService.setMapInstance(this.googleMap);
    }
  }
  apiLoaded: Observable<boolean>;
  options: google.maps.MapOptions;
  center: google.maps.LatLngLiteral;

  fieldsResponse: Signal<HarvestHubResponse<FieldViewModel[]>>;
  fields: Signal<FieldViewModel[]> = computed(() => this.fieldsResponse().data)
  fieldsLoaded: Signal<boolean> = computed(() => this.fieldsResponse().loaded)
  
  constructor(
    public mapService: MapService,
    public fieldsService: FieldsService
  ) {
    this.fieldsResponse = fieldsService.getFields() 
    this.apiLoaded = this.mapService.loadMap().pipe(
      tap({
        next: () => this.initializeMap()
      })
    )
  }

  initializeMap(): void {
    this.options = {
      disableDefaultUI: true,
      fullscreenControl: false,
      mapTypeId: google.maps.MapTypeId.HYBRID,
    }
    this.center = {lat: 53.0518, lng: 20.703};
  }
}
