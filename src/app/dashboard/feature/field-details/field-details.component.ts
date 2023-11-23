import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FieldDetailsInfoComponent } from './field-details-info/field-details-info.component';
import { FieldDetailsHistoryComponent } from './field-details-history/field-details-history.component';

@Component({
  selector: 'app-field-details',
  standalone: true,
  imports: [CommonModule, FieldDetailsInfoComponent,FieldDetailsHistoryComponent],
  templateUrl: './field-details.component.html',
  styleUrl: './field-details.component.scss'
})
export class FieldDetailsComponent {
  tabId = 1;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    public dialogRef: MatDialogRef<FieldDetailsComponent>
  ) {}

  onChangeTab(tabId: number) {
    this.tabId = tabId;
  }

  onDialogClose() {
    this.dialogRef.close();
  }
}
