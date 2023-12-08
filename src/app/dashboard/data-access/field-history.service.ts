import { Injectable, Signal, computed, signal } from '@angular/core';
import { HarvestHubResponse } from '../../shared/data-model/harvest-hub-response.model';
import { CultivationHistoryRecord } from '../data-model/cultivation-history-record.model';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, Observable, Subject, Subscription, catchError, map } from 'rxjs';
import { confirmDialog } from '../../shared/utils/confirm.operator';

@Injectable({
  providedIn: 'root'
})
export class FieldHistoryService {
  URL = 'https://localhost:7258/api/fields/'

  private state = signal<HarvestHubResponse<CultivationHistoryRecord[]>>({
    data: [],
    loaded: false,
    error: null
  });

  historyLoaded: Signal<boolean> = computed(() => this.state().loaded);
  data: Signal<CultivationHistoryRecord[]> = computed(() => this.state().data)
  private loadCultivationHistorySub: Subscription;
  deleteCultivationHistoryRecord: Subject<{fieldId: string, historyRecordId: string}> = new Subject<{fieldId: string, historyRecordId: string}>();

  constructor(
    public http: HttpClient,
  ) { 
    this.deleteCultivationHistoryRecord.pipe(
      takeUntilDestroyed(),
      confirmDialog(data => {
        return this.deleteCultivationHistoryRecordApi(data.fieldId, data.historyRecordId)
        .pipe(
          catchError(_ => EMPTY),
          map(_ => data.historyRecordId)
        )
      }, false)
    ).subscribe({
      next: historyRecordId => this.state.update(state => ({
        ...state,
        data: state.data.filter(historyRecord => historyRecord.id !== historyRecordId),
        loaded: true
      })),
      error: err => this.state.update(state => ({
        ...state,
        error: err
      }))
    });
  }

  getCultivationHistory(id: string): void {
    this.onLoading()
    this.loadCultivationHistorySub = this.loadCultivationHistoryApi(id).subscribe({
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

  private loadCultivationHistoryApi(id: string): Observable<CultivationHistoryRecord[]> {
    return this.http.get<CultivationHistoryRecord[]>(this.URL + id + '/history');
  }

  private deleteCultivationHistoryRecordApi(fieldId: string, historyRecordId: string): Observable<void> {
    return this.http.delete<void>(this.URL + fieldId + '/history/' + historyRecordId);
  }

  private onLoading() {
    if(this.loadCultivationHistorySub) {
      this.loadCultivationHistorySub.unsubscribe();
    }

    this.state.update(_ => ({
      data: [],
      loaded: false,
      error: null
    }));
  }
}
