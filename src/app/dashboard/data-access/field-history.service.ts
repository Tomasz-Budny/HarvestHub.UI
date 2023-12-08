import { Injectable, Signal, computed, signal } from '@angular/core';
import { HarvestHubResponse } from '../../shared/data-model/harvest-hub-response.model';
import { CultivationHistory } from '../data-model/cultivation-history.model';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FieldHistoryService {
  URL = 'https://localhost:7258/api/fields/'

  private state = signal<HarvestHubResponse<CultivationHistory[]>>({
    data: [],
    loaded: false,
    error: null
  });

  historyLoaded: Signal<boolean> = computed(() => this.state().loaded);
  data: Signal<CultivationHistory[]> = computed(() => this.state().data)

  constructor(
    public http: HttpClient,
  ) { }

  getCultivationHistory(id: string): void {
    tap(_ => this.onLoading())
    this.loadCultivationHistory(id).subscribe({
      next: res => this.state.update(state => ({
        ...state,
        data: res,
        loaded: true
      })),
      error: err => this.state.update(state => ({
        ...state,
        error: err
      }))
    });
  }

  private loadCultivationHistory(id: string): Observable<CultivationHistory[]> {
    return this.http.get<CultivationHistory[]>(this.URL + id + '/history');
  }

  private onLoading() {
    this.state.update(state => ({
      ...state,
      loaded: false
    }));
  }
}
