import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapService } from '../../../data-access/map.service';
import { FieldViewModel } from '../../../data-model/field.model';
import { FieldsService } from '../../../data-access/fields.service';

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
    private fieldService: FieldsService
  ) {}

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.leave.emit();
  }

  onfieldFocusClick() {
    this.mapService.focus(this.field.center);
  }

  onFieldDeleteClick() {
    this.fieldService.remove$.next(this.field.id)
  }

  onEditFieldBorders() {
    this.mapService.focus(this.field.center);
    this.mapService.editPolygonBorders(this.field);
  }
}
