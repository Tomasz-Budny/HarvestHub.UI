import { Component, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FieldsService } from '../../data-access/fields.service';
import { Field } from '../../data-model/field.model';

@Component({
  selector: 'app-fields-area-chart',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './fields-area-chart.component.html',
  styleUrl: './fields-area-chart.component.scss'
})
export class FieldsAreaChartComponent {
  fields: Signal<Field[]>;

  constructor(
    private fieldsService: FieldsService
  ) {
    this.fields = fieldsService.getFields();
  }

  colors = computed(() => this.fields().map(x => { return { name: x.name, value: x.color} }));

  data = computed(() => this.fields().map(x => { return { name: x.name, value: x.area} }));

  // customColors = [
  //   { name: "Działka #1", value: '#324C08' },
  //   { name: "Działka #2", value: '#E6E5A3' },
  //   { name: "Działka #3", value: '#856035' },
  //   { name: "Działka #4", value: '#DAC92E' },
  //   { name: "Działka #5", value: '#647D3B' },
  //   { name: "Działka #6", value: '#C1C35D' }
  // ];

  // dataset = [
  //   { name: "Działka #1", value: 3.14 },
  //   { name: "Działka #2", value: 5.64 },
  //   { name: "Działka #3", value: 9.25 },
  //   { name: "Działka #4", value: 5.01 },
  //   { name: "Działka #5", value: 7.57 },
  //   { name: "Działka #6", value: 8.01 },
  // ];
}
