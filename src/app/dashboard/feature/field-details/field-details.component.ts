import { Component, ElementRef, Inject, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { FieldDetailsInfoComponent } from './field-details-info/field-details-info.component';
import { FieldDetailsHistoryComponent } from './field-details-history/field-details-history.component';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-field-details',
  standalone: true,
  imports: [CommonModule, FieldDetailsInfoComponent,FieldDetailsHistoryComponent, MatIconModule],
  templateUrl: './field-details.component.html',
  styleUrl: './field-details.component.scss'
})
export class FieldDetailsComponent {
  tabId = 1;
  fieldId: string;
  @ViewChild("closeIcon", { read: ElementRef }) closeIcon: ElementRef

  constructor(
    @Inject(DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FieldDetailsComponent>
  ) {
    this.fieldId = data.fieldId;
  }

  ngAfterViewInit() {
    this.closeIcon.nativeElement.addEventListener('mouseenter', (event) => {
      const circle = this.closeIcon.nativeElement.querySelector('svg').querySelector('circle');
      circle.style.fill = '#7D8F69';
    });

    this.closeIcon.nativeElement.addEventListener('mouseleave', (event) => {
      const circle = this.closeIcon.nativeElement.querySelector('svg').querySelector('circle');
      circle.style.fill = '#D9D9D9';
    });
  }

  onChangeTab(tabId: number) {
    this.tabId = tabId;
  }

  onDialogClose() {
    this.dialogRef.close();
  }
}
