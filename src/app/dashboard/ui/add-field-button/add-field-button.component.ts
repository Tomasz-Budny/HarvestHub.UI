import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapService } from '../../data-access/map.service';

@Component({
  selector: 'app-add-field-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-field-button.component.html',
  styleUrl: './add-field-button.component.scss'
})
export class AddFieldButtonComponent {

  constructor(
    public mapService: MapService
  ) {}

  onAddNewField() {
    this.mapService.addNewField()
  }
}
