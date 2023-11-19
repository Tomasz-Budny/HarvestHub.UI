import { Component } from '@angular/core';
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

  discard() {
    this.onAddingMode = false;
    this.mapService.discardAddingPolygon();
  }
}
