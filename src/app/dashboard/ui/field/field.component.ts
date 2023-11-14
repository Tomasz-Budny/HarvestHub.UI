import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-field',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './field.component.html',
  styleUrl: './field.component.scss'
})
export class FieldComponent {

}
