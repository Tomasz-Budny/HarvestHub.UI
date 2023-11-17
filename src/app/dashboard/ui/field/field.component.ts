import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HectarePipe } from '../../../shared/utils/hectare.pipe';

@Component({
  selector: 'app-field',
  standalone: true,
  imports: [CommonModule, MatIconModule, HectarePipe],
  templateUrl: './field.component.html',
  styleUrl: './field.component.scss'
})
export class FieldComponent {
  @Input() name: string;
  @Input() area: number;
  @Input() address: string;
  @Input() color: string;
}
