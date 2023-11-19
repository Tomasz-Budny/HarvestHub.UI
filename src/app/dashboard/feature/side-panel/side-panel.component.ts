import { Component, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherForecastComponent } from '../weather-forecast/weather-forecast.component';
import { CopyrightComponent } from '../../ui/copyright/copyright.component';
import { FieldsComponent } from '../fields/fields.component';
import { FieldsAreaChartComponent } from '../../ui/fields-area-chart/fields-area-chart.component';
import { FieldsService } from '../../data-access/fields.service';

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [CommonModule, WeatherForecastComponent, CopyrightComponent, FieldsComponent, FieldsAreaChartComponent],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.scss'
})
export class SidePanelComponent {
  fieldsLoaded: Signal<boolean> = computed(() => this.fieldsService.getFields()().loaded);

  fieldsNotEmpty: Signal<boolean> = computed(() => {
    if(this.fieldsService.getFields()().data.length > 0) {
      return true;
    }
    return false
  })

  constructor(
    public fieldsService: FieldsService
  ) { }
}
