import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapService } from '../../data-access/map.service';
import { FieldsService } from '../../data-access/fields.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-add-field-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-field-button.component.html',
  styleUrl: './add-field-button.component.scss'
})
export class AddFieldButtonComponent {
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
