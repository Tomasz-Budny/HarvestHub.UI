import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CropType } from '../../data-model/crop-type.model';
import { CropTypeUtil } from '../../utils/crop-type.util';
import { CropTypePipe } from '../../utils/crop-type.pipe';
import { FertilizerType } from '../../data-model/fertilizer-type.model';
import { FertilizerTypeUtil } from '../../utils/fertilizer-type.util';
import { FertilizerTypePipe } from '../../utils/fertilizer-type.pipe';

@Component({
  selector: 'app-cultivation-history-record-creator',
  standalone: true,
  imports: [CommonModule, MatSelectModule, CropTypePipe, FertilizerTypePipe],
  templateUrl: './cultivation-history-record-creator.component.html',
  styleUrl: './cultivation-history-record-creator.component.scss'
})
export class CultivationHistoryRecordCreatorComponent {
  fieldId: string;
  historyRecordTypes = ['harvest', 'fertilization']
  chosenHistoryRecordType = this.historyRecordTypes[0];
  cropTypes: CropType[] = CropTypeUtil.getAllCropTypes();
  fertilizerTypes: FertilizerType[] = FertilizerTypeUtil.getAllFertilizerTypes();

  constructor(
    @Inject(DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CultivationHistoryRecordCreatorComponent>
  ) {
    this.fieldId = data.fieldId;
  }
}
