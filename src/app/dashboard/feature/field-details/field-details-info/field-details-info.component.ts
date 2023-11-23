import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldDetailsService } from '../../../data-access/field-details.service';
import { FieldDetailsViewModel } from '../../../data-model/field-details.model';
import { Observable } from 'rxjs';
import { HectarePipe } from '../../../../shared/utils/hectare.pipe';
import { SoilClassPipe } from '../../../utils/soil-class.pipe';
import { OwnershipStatusPipe } from '../../../utils/ownership-status.pipe';
import { AddressPipe } from '../../../utils/address.pipe';
import { MatDialogRef } from '@angular/material/dialog';
import { FieldDetailsComponent } from '../field-details.component';
import { FieldsService } from '../../../data-access/fields.service';
import { MapService } from '../../../data-access/map.service';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { OwnerShipStatusUtil } from '../../../utils/ownership-status.util';
import { OwnershipStatus } from '../../../data-model/ownership-status.model';
import { SoilClass } from '../../../data-model/soil-class.model';
import { SoilClassUtil } from '../../../utils/soil-class-util';

@Component({
  selector: 'app-field-details-info',
  standalone: true,
  imports: [CommonModule, HectarePipe, SoilClassPipe, OwnershipStatusPipe, AddressPipe, MatSelectModule],
  templateUrl: './field-details-info.component.html',
  styleUrl: './field-details-info.component.scss'
})
export class FieldDetailsInfoComponent implements OnInit {
  @Input() fieldId: string;
  fieldDetails$: Observable<FieldDetailsViewModel>;
  ownershipStatuses: OwnershipStatus[];
  soilClasses: SoilClass[];
  isOwnershipStatusEditing: boolean = false;
  isSoilClassEditing: boolean = false;

  constructor(
    private fieldDetailsService: FieldDetailsService,
    public dialogRef: MatDialogRef<FieldDetailsComponent>,
    private fieldService: FieldsService,
    private mapService: MapService
  ) {
    this.ownershipStatuses = OwnerShipStatusUtil.getAllOwnerShipStatuses();
    this.soilClasses = SoilClassUtil.getAllSoilClasses()
  }

  ngOnInit() {
    this.fieldDetails$ = this.fieldDetailsService.loadFieldDetails(this.fieldId);
  }

  onEditFieldBorders() {
    this.dialogRef.close();
    const field = this.fieldService.getField(this.fieldId);
    this.mapService.focusOnField(field);
    this.mapService.initializeEditPolygonBorders(field);
  }

  onDelete() {
    this.fieldService.remove$.next(this.fieldId);
  }

  onSoilClassSelected($event: MatSelectChange) {
    this.isSoilClassEditing = false;
    this.fieldDetailsService.updateSoilClass$.next({
      fieldId: this.fieldId,
      soilClass: $event.value
    });
  }

  onOwnershipStatusSelected($event: MatSelectChange) {
    this.isOwnershipStatusEditing = false;
    this.fieldDetailsService.updateOwnerShipStatus$.next({
      fieldId: this.fieldId,
      ownershipStatus: $event.value
    });
  }
}
