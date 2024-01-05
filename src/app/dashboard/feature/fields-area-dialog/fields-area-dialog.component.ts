import { AfterViewInit, Component, ElementRef, Signal, ViewChild, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HarvestHubResponse } from '../../../shared/data-model/harvest-hub-response.model';
import { FieldViewModel } from '../../data-model/field.model';
import { FieldsService } from '../../data-access/fields.service';
import { MatDialogRef } from '@angular/material/dialog';
import { HectarePipe } from '../../../shared/utils/hectare.pipe';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-fields-area-dialog',
  standalone: true,
  imports: [CommonModule, NgxChartsModule, HectarePipe, MatIconModule],
  templateUrl: './fields-area-dialog.component.html',
  styleUrl: './fields-area-dialog.component.scss'
})
export class FieldsAreaDialogComponent implements AfterViewInit {

  @ViewChild("closeIcon", { read: ElementRef }) closeIcon: ElementRef;

  fieldsResponse: Signal<HarvestHubResponse<FieldViewModel[]>>;
  fields: Signal<FieldViewModel[]> = computed(() => this.fieldsResponse().data);
  fieldsLoaded: Signal<boolean> = computed(() => this.fieldsResponse().loaded);

  colors = computed(() => this.fields().map(x => { return { name: x.name, value: x.color} }));
  data = computed(() => this.fields().map(x => { return { name: x.name, value: x.area} }));

  constructor(
    private fieldsService: FieldsService,
    private dialogRef: MatDialogRef<FieldsAreaDialogComponent>
  ) {
    this.fieldsResponse = this.fieldsService.getFields();
  }
  
  ngAfterViewInit() {
    this.closeIcon.nativeElement.addEventListener('mouseenter', (event) => {
      const circle = this.closeIcon.nativeElement.querySelector('svg').querySelector('circle');
      circle.style.fill = '#7D8F69';
    });

    this.closeIcon.nativeElement.addEventListener('mouseleave', (event) => {
      const circle = this.closeIcon.nativeElement.querySelector('svg').querySelector('circle');
      circle.style.fill = '#D9D9D9';
    });
  }

  getAddress(name: string): string {
    return this.fields().find(x => x.name === name).address.city;
  }

  onDialogClose() {
    this.dialogRef.close();
  }
}
