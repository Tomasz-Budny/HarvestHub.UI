import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FertilizationHistoryRecord } from '../../data-model/fertilization-history-record.model';
import { FertilizerTypePipe } from '../../utils/fertilizer-type.pipe';
import { MatIconModule } from '@angular/material/icon';
import { HistoryRecordToolboxComponent } from '../history-record-toolbox/history-record-toolbox.component';
import { ToolBoxDirective } from '../../../shared/utils/toolbox.directive';

@Component({
  selector: 'app-fertilization-history-record',
  standalone: true,
  imports: [CommonModule, FertilizerTypePipe, MatIconModule, HistoryRecordToolboxComponent, ToolBoxDirective],
  templateUrl: './fertilization-history-record.component.html',
  styleUrl: './fertilization-history-record.component.scss'
})
export class FertilizationHistoryRecordComponent {
  @Input() data: FertilizationHistoryRecord;
  tooltipVisible: boolean = false;
}
