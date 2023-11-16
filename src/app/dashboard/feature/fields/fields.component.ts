import { Component, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldComponent } from '../../ui/field/field.component';
import { FieldsService } from '../../data-access/fields.service';
import { FieldViewModel } from '../../data-model/field.model';

@Component({
  selector: 'app-fields',
  standalone: true,
  imports: [CommonModule, FieldComponent],
  templateUrl: './fields.component.html',
  styleUrl: './fields.component.scss'
})
export class FieldsComponent {
  fields: Signal<FieldViewModel[]>;
  hectares = computed(() => this.fields().reduce((prev, curr) => prev + curr.area, 0))

  constructor(
    public fieldsService: FieldsService
  ) {
    this.fields = this.fieldsService.getFields();
    this.fieldsService.setFields();
  }


}
