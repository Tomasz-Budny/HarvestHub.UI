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
import { FormsModule, NgForm } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { FieldHistoryService } from '../../data-access/field-history.service';
import { CultivationHistoryRecordTypePipe } from '../../utils/cultivation-history-record-type.pipe';

@Component({
  selector: 'app-cultivation-history-record-creator',
  standalone: true,
  imports: [CommonModule, MatSelectModule, CropTypePipe, FertilizerTypePipe, FormsModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatDatepickerModule, CultivationHistoryRecordTypePipe],
  templateUrl: './cultivation-history-record-creator.component.html',
  styleUrl: './cultivation-history-record-creator.component.scss'
})
export class CultivationHistoryRecordCreatorComponent {
  fieldId: string;
  historyRecordTypes = ['harvest', 'fertilization']
  chosenHistoryRecordType = this.historyRecordTypes[0];
  cropTypes: CropType[] = CropTypeUtil.getAllCropTypes();
  fertilizerTypes: FertilizerType[] = FertilizerTypeUtil.getAllFertilizerTypes();
  currentDay: Date = new Date();

  constructor(
    public fieldHistoryService: FieldHistoryService,
    @Inject(DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CultivationHistoryRecordCreatorComponent>
  ) {
    this.fieldId = data.fieldId;
  }

  createCultivationHistory(form: NgForm) {
    this.dialogRef.disableClose = false;
    const cultivationHistoryRecord = form.value;

    if(this.chosenHistoryRecordType === 'harvest') {
      this.fieldHistoryService.addHarvestHistoryRecord$.next({
        fieldId: this.fieldId,
        record: cultivationHistoryRecord
      });
    }
    if(this.chosenHistoryRecordType === 'fertilization') {
      this.fieldHistoryService.addFertiliziationHistoryRecord$.next({
        fieldId: this.fieldId,
        record: cultivationHistoryRecord
      });
    }
    this.dialogRef.close();
  }
}
