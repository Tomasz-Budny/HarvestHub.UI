import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Signal, ViewChild, computed } from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { Observable, tap } from 'rxjs';
import { MapService } from '../../data-access/map.service';
import { FieldsService } from '../../data-access/fields.service';
import { FieldViewModel } from '../../data-model/field.model';
import { HarvestHubResponse } from '../../../shared/data-model/harvest-hub-response.model';
import { MapControlsComponent } from '../../ui/map-controls/map-controls.component';
import { MapControlDirective } from '../../utils/map-control.directive';
import { MatDialog } from '@angular/material/dialog';
import { FieldDetailsComponent } from '../field-details/field-details.component';
import { FieldInfoModalSvgPipe } from '../../utils/field-info-modal-svg.pipe';
import { OwnerService } from '../../data-access/owner.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CoordinatesViewModel } from '../../data-model/coordinates.model';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, MapControlsComponent, MapControlDirective, FieldInfoModalSvgPipe],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {
  private googleMap: GoogleMap;
  @ViewChild(GoogleMap) set map(content: GoogleMap) {
    if(content && !this.googleMap) {
      this.googleMap = content;
      this.mapService.setMapInstance(this.googleMap);
    }
  }
  @ViewChild('editHomePosition') editHomePosition: ElementRef;
  apiLoaded: Observable<boolean>;
  options: google.maps.MapOptions;

  fieldsResponse: Signal<HarvestHubResponse<FieldViewModel[]>>;
  fields: Signal<FieldViewModel[]> = computed(() => this.fieldsResponse().data)
  fieldsLoaded: Signal<boolean> = computed(() => this.fieldsResponse().loaded)
  marker: {name: string, color: string, center}
  hoveredField: FieldViewModel;
  editingFieldId = this.mapService.editingFieldId;
  mouseCoordinates: CoordinatesViewModel;

  constructor(
    public mapService: MapService,
    public fieldsService: FieldsService,
    private dialog: MatDialog,
    public ownerService: OwnerService
  ) {
    this.fieldsResponse = fieldsService.getFields() 
    this.apiLoaded = this.mapService.loadMap().pipe(
      tap({
        next: () => this.initializeMap()
      })
    )

    this.mapService.changeStartLocation.pipe(
      takeUntilDestroyed()
    ).subscribe(coords => {
      this.ownerService.changeStartLocation$.next(coords);
    });
  }

  ngAfterViewInit() {
    this.mapService.setMapControls(this.editHomePosition)
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

    this.hoveredField = field;
  }

  onFieldMouseout() {
    this.marker = null;

    this.hoveredField = null;
  }

  onPolygonClick(field: FieldViewModel) {
    this.dialog.open(FieldDetailsComponent, {
      data: {
        fieldId: field.id
      }
    });
  }

  mapMouseMove(e) {
    const coords = e.latLng.toJSON();
    this.mouseCoordinates = {...coords, lat: coords.lat + 0.00001};
  }

  onChangeStarLocation() {
    this.mapService.changeStartLocationToggle();
  }
}
