import { Component } from '@angular/core';
import { MapComponent } from './map/map.component';
import { SidePanelComponent } from './side-panel/side-panel.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MapComponent, SidePanelComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  
}
