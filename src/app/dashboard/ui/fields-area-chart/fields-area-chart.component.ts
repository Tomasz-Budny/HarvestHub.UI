import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-fields-area-chart',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './fields-area-chart.component.html',
  styleUrl: './fields-area-chart.component.scss'
})
export class FieldsAreaChartComponent {
  title = 'barchartApp';
  customColors = [
    { name: "X", value: '#324C08' },
    { name: "Y", value: '#E6E5A3' }
  ];

  dataset = [
    { name: "X", value: 1 },
    { name: "Y", value: 2 }
  ];
}
