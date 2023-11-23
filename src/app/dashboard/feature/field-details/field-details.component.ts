import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-field-details',
  standalone: true,
  imports: [CommonModule],
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
