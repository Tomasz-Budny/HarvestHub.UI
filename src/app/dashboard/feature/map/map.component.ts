import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './map.component.html'
})
export class MapComponent {
  
}
