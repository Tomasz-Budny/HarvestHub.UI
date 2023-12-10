import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorUtil } from '../../../../utils/color.util';
import { FieldDetailsService } from '../../../../data-access/field-details.service';

@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss'
})
export class ColorPickerComponent {
  @Input() initialColor: string
  @Input() fieldId: string
  @Output() initialColorChange: EventEmitter<string> = new EventEmitter<string>();
  colors: string[] = ColorUtil.hexColors

  constructor(
    private fieldDetailsService: FieldDetailsService
  ) {}

  onPickColor(color: string) {
    if(color !== this.initialColor) {
      this.fieldDetailsService.updateFieldColor$.next({fieldId: this.fieldId, color: color});
      this.initialColor = color;
      this.initialColorChange.emit(this.initialColor);
    }
  }
}
