import { Component, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapService } from '../../data-access/map.service';
import { FieldsService } from '../../data-access/fields.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-map-controls',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-controls.component.html',
  styleUrl: './map-controls.component.scss'
})
export class MapControlsComponent {
  onAddingMode: boolean = false;
  onEditingFieldMode: Signal<boolean> = computed(() => {
    if(this.mapService.editingFieldId()) {
      return true;
    } else return false;
  })

  constructor(
    public mapService: MapService,
    private fieldsService: FieldsService
  ) { 
    this.fieldsService.add$.asObservable().pipe(
      takeUntilDestroyed()
    ).subscribe(_ => {
      this.onAddingMode = false;
    });
  }

  onAddNewField() {
    this.onAddingMode = true;
    this.mapService.addNewField()
  }

  discardAddingField() {
    this.onAddingMode = false;
    this.mapService.discardAddingPolygon();
  }

  discardFieldVericesEditing() {
    this.mapService.discardPolygonBordersEditing();
  }

  editFieldVertices() {
    this.mapService.editPolygonBorders();
  }
}
