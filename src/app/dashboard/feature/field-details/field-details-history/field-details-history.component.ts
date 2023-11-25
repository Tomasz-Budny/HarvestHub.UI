import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HarvestHistoryRecordComponent } from '../../../ui/harvest-history-record/harvest-history-record.component';

@Component({
  selector: 'app-field-details-history',
  standalone: true,
  imports: [CommonModule, HarvestHistoryRecordComponent],
  templateUrl: './field-details-history.component.html',
  styleUrl: './field-details-history.component.scss'
})
export class FieldDetailsHistoryComponent {

}
