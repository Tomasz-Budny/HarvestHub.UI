import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HarvestHistoryRecord } from '../../data-model/harvest-history-record.model';
import { CropTypePipe } from '../../utils/crop-type.pipe';

@Component({
  selector: 'app-harvest-history-record',
  standalone: true,
  imports: [CommonModule, CropTypePipe],
  templateUrl: './harvest-history-record.component.html',
  styleUrl: './harvest-history-record.component.scss'
})
export class HarvestHistoryRecordComponent {
  @Input() data: HarvestHistoryRecord;
}
