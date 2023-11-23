import { Injectable } from '@angular/core';
import { FieldDetailsViewModel } from '../data-model/field-details.model';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FieldDetailsService {
  URL = 'https://localhost:7258/api/fields/'

  constructor(
    public http: HttpClient
  ) { }

  loadFieldDetails(fieldId: string): Observable<FieldDetailsViewModel> {
    return this.getFieldDetailsApi(fieldId);
  }

  private getFieldDetailsApi(fieldId: string) {
    return this.http.get<FieldDetailsViewModel>(this.URL + `${fieldId}/details`)
  }
}
