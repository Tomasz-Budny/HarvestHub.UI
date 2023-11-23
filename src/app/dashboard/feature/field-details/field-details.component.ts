import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-field-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './field-details.component.html',
  styleUrl: './field-details.component.scss'
})
export class FieldDetailsComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}
}
