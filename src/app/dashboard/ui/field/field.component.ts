import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HectarePipe } from '../../../shared/utils/hectare.pipe';
import { FieldTooltipComponent } from './field-tooltip/field-tooltip.component';
import { ToolBoxDirective } from '../../../shared/utils/tooltip.directive';
import { FieldViewModel } from '../../data-model/field.model';

@Component({
  selector: 'app-field',
  standalone: true,
  imports: [CommonModule, MatIconModule, HectarePipe, FieldTooltipComponent, ToolBoxDirective],
  templateUrl: './field.component.html',
  styleUrl: './field.component.scss'
})
export class FieldComponent {
  @Input() name: string;
  @Input() area: number;
  @Input() address: string;
  @Input() color: string;

  @Input() field: FieldViewModel;

  tooltipVisible: boolean = false;
}
