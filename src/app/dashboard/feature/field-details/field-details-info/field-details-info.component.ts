import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldDetailsService } from '../../../data-access/field-details.service';
import { FieldDetailsViewModel } from '../../../data-model/field-details.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-field-details-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './field-details-info.component.html',
  styleUrl: './field-details-info.component.scss'
})
export class FieldDetailsInfoComponent implements OnInit {
  @Input() fieldId: string;
  fieldDetails$: Observable<FieldDetailsViewModel>;

  constructor(
    private fieldDetailsService: FieldDetailsService
  ) {}

  ngOnInit() {
    this.fieldDetails$ = this.fieldDetailsService.loadFieldDetails(this.fieldId);
  }
}
