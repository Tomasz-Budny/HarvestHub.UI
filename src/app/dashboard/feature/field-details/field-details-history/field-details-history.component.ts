import { Component, Input, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HarvestHistoryRecordComponent } from '../../../ui/harvest-history-record/harvest-history-record.component';
import { FieldHistoryService } from '../../../data-access/field-history.service';
import { CultivationHistory } from '../../../data-model/cultivation-history.model';

@Component({
  selector: 'app-field-details-history',
  standalone: true,
  imports: [CommonModule, HarvestHistoryRecordComponent],
  templateUrl: './field-details-history.component.html',
  styleUrl: './field-details-history.component.scss'
})
export class FieldDetailsHistoryComponent implements OnInit {
  @Input() fieldId: string;
  historyLoaded: Signal<Boolean>;
  history: Signal<CultivationHistory[]>;

  constructor(
    private historyService: FieldHistoryService
  ) {}

  ngOnInit() {
    this.historyService.getCultivationHistory(this.fieldId);
    this.historyLoaded = this.historyService.historyLoaded;
    this.history = this.historyService.data;
  }
}
