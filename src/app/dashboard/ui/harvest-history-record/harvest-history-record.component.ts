import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HarvestHistoryRecord } from '../../data-model/harvest-history-record.model';

@Component({
  selector: 'app-harvest-history-record',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './harvest-history-record.component.html',
  styleUrl: './harvest-history-record.component.scss'
})
export class HarvestHistoryRecordComponent {
  @Input() data: HarvestHistoryRecord;
}
