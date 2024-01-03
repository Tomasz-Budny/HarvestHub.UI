import { Component } from '@angular/core';
import { MapComponent } from './map/map.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { NavbarComponent } from '../../shared/feature/navbar/navbar.component';
import { OwnerService } from '../data-access/owner.service';
import { FieldsService } from '../data-access/fields.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MapComponent, SidePanelComponent, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(
    private ownerService: OwnerService,
    private fieldsService: FieldsService
  ) {
    this.fieldsService.loadFields();
    this.ownerService.loadStartLocation();
  }
}
