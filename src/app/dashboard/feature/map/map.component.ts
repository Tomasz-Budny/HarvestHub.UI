import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Signal, ViewChild, computed } from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { Observable, tap } from 'rxjs';
import { MapService } from '../../data-access/map.service';
import { FieldsService } from '../../data-access/fields.service';
import { FieldViewModel } from '../../data-model/field.model';
import { HarvestHubResponse } from '../../../shared/data-model/harvest-hub-response.model';
import { MapControlsComponent } from '../../ui/map-controls/map-controls.component';
import { MapControlDirective } from '../../utils/map-control.directive';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, MapControlsComponent, MapControlDirective],
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

  fieldsResponse: Signal<HarvestHubResponse<FieldViewModel[]>>;
  fields: Signal<FieldViewModel[]> = computed(() => this.fieldsResponse().data)
  fieldsLoaded: Signal<boolean> = computed(() => this.fieldsResponse().loaded)
  marker: {name: string, color: string, center}

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
  }

  onFieldMouseover(field: FieldViewModel) {
    this.marker = {name: field.name, color: field.color, center: field.center}
  }

  onFieldMouseout() {
    this.marker = null;
  }
}
