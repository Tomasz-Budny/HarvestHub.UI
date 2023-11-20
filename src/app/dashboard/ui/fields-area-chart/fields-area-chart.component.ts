import { Component, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FieldsService } from '../../data-access/fields.service';
import { FieldViewModel } from '../../data-model/field.model';
import { HarvestHubResponse } from '../../../shared/data-model/harvest-hub-response.model';
import { HectarePipe } from '../../../shared/utils/hectare.pipe';
import { MapService } from '../../data-access/map.service';

@Component({
  selector: 'app-fields-area-chart',
  standalone: true,
  imports: [CommonModule, NgxChartsModule, HectarePipe],
  templateUrl: './fields-area-chart.component.html',
  styleUrl: './fields-area-chart.component.scss'
})
export class FieldsAreaChartComponent {
  fieldsResponse: Signal<HarvestHubResponse<FieldViewModel[]>>;
  fields: Signal<FieldViewModel[]> = computed(() => this.fieldsResponse().data);
  legendVisible: boolean = false;

  constructor(
    private fieldsService: FieldsService,
    private mapService: MapService
  ) {
    this.fieldsResponse = this.fieldsService.getFields();
  }

  colors = computed(() => this.fields().map(x => { return { name: x.id, value: x.color} }));

  data = computed(() => this.fields().map(x => { return { name: x.id, value: x.area} }));

  getAddress(id: string): string {
    return this.fields().find(x => x.id === id).address.city;
  }

  getName(id: string) {
    return this.fields().find(x => x.id === id).name;
  }

  onSelect($event: {name: string, label: string, value: number}) {
    const field = this.fields().find(field => field.id === $event.name);

    if(field) {
      this.mapService.focusOnField(field);
    }
  }
}
