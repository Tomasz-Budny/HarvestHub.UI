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
  legendVisible: boolean = false;

  constructor(
    private fieldsService: FieldsService
  ) {
    this.fields = this.fieldsService.getFields();
  }

  colors = computed(() => this.fields().map(x => { return { name: x.name, value: x.color} }));

  data = computed(() => this.fields().map(x => { return { name: x.name, value: x.area} }));

  getAddress(name: string): string {
    return this.fields().find(x => x.name === name).address;
  }
}
