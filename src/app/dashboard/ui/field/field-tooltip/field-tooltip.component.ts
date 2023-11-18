import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-field-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './field-tooltip.component.html',
  styleUrl: './field-tooltip.component.scss'
})
export class FieldTooltipComponent {

  @Output() leave = new EventEmitter()

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.leave.emit();
  }
}
