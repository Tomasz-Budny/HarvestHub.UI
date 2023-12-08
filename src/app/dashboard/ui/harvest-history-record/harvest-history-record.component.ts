import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HarvestHistoryRecord } from '../../data-model/harvest-history-record.model';
import { CropTypePipe } from '../../utils/crop-type.pipe';
import { MatIconModule } from '@angular/material/icon';
import { HistoryRecordToolboxComponent } from '../history-record-toolbox/history-record-toolbox.component';
import { ToolBoxDirective } from '../../../shared/utils/toolbox.directive';

@Component({
  selector: 'app-harvest-history-record',
  standalone: true,
  imports: [CommonModule, CropTypePipe, MatIconModule, HistoryRecordToolboxComponent, ToolBoxDirective],
  templateUrl: './harvest-history-record.component.html',
  styleUrl: './harvest-history-record.component.scss'
})
export class HarvestHistoryRecordComponent {
  @Input() data: HarvestHistoryRecord;
  tooltipVisible: boolean = false;
}
