import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldHistoryService } from '../../data-access/field-history.service';

@Component({
  selector: 'app-history-record-toolbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history-record-toolbox.component.html',
  styleUrl: './history-record-toolbox.component.scss'
})
export class HistoryRecordToolboxComponent {
  @Output() leave = new EventEmitter()
  @Input() historyRecordId: string;
  @Input() fieldId: string;

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.leave.emit();
  }

  constructor(
    private fieldHistoryService: FieldHistoryService
  ) {}

  deleteHarvestHistoryRecord() {
    this.fieldHistoryService.deleteCultivationHistoryRecord.next({
      fieldId: this.fieldId, 
      historyRecordId: this.historyRecordId
    });
  }
}
