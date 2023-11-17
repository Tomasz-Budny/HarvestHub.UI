import { Component, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldComponent } from '../../ui/field/field.component';
import { FieldsService } from '../../data-access/fields.service';
import { FieldViewModel } from '../../data-model/field.model';
import { HarvestHubResponse } from '../../../shared/data-model/harvest-hub-response.model';

@Component({
  selector: 'app-fields',
  standalone: true,
  imports: [CommonModule, FieldComponent],
  templateUrl: './fields.component.html',
  styleUrl: './fields.component.scss'
})
export class FieldsComponent {
  fieldsResponse: Signal<HarvestHubResponse<FieldViewModel[]>>;
  fields: Signal<FieldViewModel[]> = computed(() => this.fieldsResponse().data)
  loaded: Signal<boolean> = computed(() => this.fieldsResponse().loaded)

  hectares = computed(() => this.fields().reduce((prev, curr) => prev + curr.area, 0))

  constructor(
    public fieldsService: FieldsService
  ) {
    this.fieldsResponse = this.fieldsService.getFields();
  }
}
