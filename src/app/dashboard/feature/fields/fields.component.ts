import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldComponent } from '../../ui/field/field.component';

@Component({
  selector: 'app-fields',
  standalone: true,
  imports: [CommonModule, FieldComponent],
  templateUrl: './fields.component.html',
  styleUrl: './fields.component.scss'
})
export class FieldsComponent {

}
