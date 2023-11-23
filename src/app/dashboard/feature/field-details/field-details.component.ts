import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { FieldDetailsInfoComponent } from './field-details-info/field-details-info.component';
import { FieldDetailsHistoryComponent } from './field-details-history/field-details-history.component';
import { DIALOG_DATA } from '@angular/cdk/dialog';

@Component({
  selector: 'app-field-details',
  standalone: true,
  imports: [CommonModule, FieldDetailsInfoComponent,FieldDetailsHistoryComponent],
  templateUrl: './field-details.component.html',
  styleUrl: './field-details.component.scss'
})
export class FieldDetailsComponent {
  tabId = 1;
  fieldId: string;

  constructor(
    @Inject(DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FieldDetailsComponent>
  ) {
    this.fieldId = data.fieldId;
  }

  onChangeTab(tabId: number) {
    this.tabId = tabId;
  }

  onDialogClose() {
    this.dialogRef.close();
  }
}
