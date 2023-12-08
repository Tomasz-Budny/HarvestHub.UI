import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FertilizationHistoryRecord } from '../../data-model/fertilization-history-record.model';

@Component({
  selector: 'app-fertilization-history-record',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fertilization-history-record.component.html',
  styleUrl: './fertilization-history-record.component.scss'
})
export class FertilizationHistoryRecordComponent {
  @Input() data: FertilizationHistoryRecord;
}
