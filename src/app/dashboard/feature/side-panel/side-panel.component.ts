import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherForecastComponent } from '../weather-forecast/weather-forecast.component';
import { CopyrightComponent } from '../../ui/copyright/copyright.component';
import { FieldsComponent } from '../fields/fields.component';

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [CommonModule, WeatherForecastComponent, CopyrightComponent, FieldsComponent],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.scss'
})
export class SidePanelComponent {

}
