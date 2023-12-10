import { Component, Input, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HarvestHistoryRecordComponent } from '../../../ui/harvest-history-record/harvest-history-record.component';
import { FieldHistoryService } from '../../../data-access/field-history.service';
import { CultivationHistoryRecord } from '../../../data-model/cultivation-history-record.model';
import { FertilizationHistoryRecordComponent } from '../../../ui/fertilization-history-record/fertilization-history-record.component';
import { CultivationHistoryRecordCreatorComponent } from '../../cultivation-history-record-creator/cultivation-history-record-creator.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-field-details-history',
  standalone: true,
  imports: [CommonModule, HarvestHistoryRecordComponent, FertilizationHistoryRecordComponent],
  templateUrl: './field-details-history.component.html',
  styleUrl: './field-details-history.component.scss'
})
export class FieldDetailsHistoryComponent implements OnInit {
  @Input() fieldId: string;
  historyLoaded: Signal<Boolean>;
  history: Signal<CultivationHistoryRecord[]>;

  constructor(
    private historyService: FieldHistoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.historyService.getCultivationHistory(this.fieldId);
    this.historyLoaded = this.historyService.historyLoaded;
    this.history = this.historyService.data;
  }

  onCultivationHistoryRecordCreatorClick() {
    this.dialog.open(CultivationHistoryRecordCreatorComponent, {
      data: {
        fieldId: this.fieldId
      }
    });
  }
}
