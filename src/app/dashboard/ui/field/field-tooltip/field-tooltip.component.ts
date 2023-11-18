import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapService } from '../../../data-access/map.service';
import { FieldViewModel } from '../../../data-model/field.model';

@Component({
  selector: 'app-field-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './field-tooltip.component.html',
  styleUrl: './field-tooltip.component.scss'
})
export class FieldTooltipComponent {

  @Output() leave = new EventEmitter()
  @Input() field: FieldViewModel;

  constructor(
    private mapService: MapService
  ) {}

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.leave.emit();
  }

  onfieldFocusClick() {
    this.mapService.focus(this.field.center);
  }
}
