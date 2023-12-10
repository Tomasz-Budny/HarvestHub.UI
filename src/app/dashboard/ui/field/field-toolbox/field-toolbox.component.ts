import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapService } from '../../../data-access/map.service';
import { FieldViewModel } from '../../../data-model/field.model';
import { FieldsService } from '../../../data-access/fields.service';
import { MatDialog } from '@angular/material/dialog';
import { FieldDetailsComponent } from '../../../feature/field-details/field-details.component';

@Component({
  selector: 'app-field-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './field-toolbox.component.html',
  styleUrl: './field-toolbox.component.scss'
})
export class FieldToolboxComponent {

  @Output() leave = new EventEmitter()
  @Input() field: FieldViewModel;

  constructor(
    private mapService: MapService,
    private fieldService: FieldsService,
    private dialog: MatDialog
  ) {}

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.leave.emit();
  }

  onfieldFocusClick() {
    this.mapService.focusOnField(this.field);
  }

  onFieldDeleteClick() {
    this.fieldService.remove$.next(this.field.id)
  }

  onEditFieldBorders() {
    this.mapService.focusOnField(this.field);
    this.mapService.initializeEditPolygonBorders(this.field);
  }

  onFieldDetailsClick() {
    this.dialog.open(FieldDetailsComponent, {
      data: {
        fieldId: this.field.id
      }
    });
  }
}
