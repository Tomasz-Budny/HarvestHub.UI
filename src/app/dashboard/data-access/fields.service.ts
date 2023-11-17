import { Injectable, Signal, computed, signal } from '@angular/core';
import { FieldViewModel } from '../data-model/field.model';
import { NEVER, delay, of } from 'rxjs';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { HarvestHubResponse } from '../../shared/data-model/harvest-hub-response.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {
  URL = 'https://localhost:7258/api/fields';

  private state = signal<HarvestHubResponse<FieldViewModel[]>>({
    data: [],
    loaded: false,
    error: null
  });

  fieldsLoaded: Signal<boolean> = computed(() => this.state().loaded)

  constructor(
    public http: HttpClient
  ) { 
    this.loadFields().subscribe({
      next: res => this.state.update(state => ({
        ...state,
        data: res,
        loaded: true
      })),
      error: err => this.state.update(state => ({
        ...state,
        error: err
      }))
    })
  }

  getFields() {
    return this.state.asReadonly();
  }

  loadFields() {
    return this.http.get<FieldViewModel[]>(this.URL).pipe(
      takeUntilDestroyed()
    );
  }
}
