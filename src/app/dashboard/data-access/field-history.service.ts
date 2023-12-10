import { Injectable, Signal, computed, signal } from '@angular/core';
import { HarvestHubResponse } from '../../shared/data-model/harvest-hub-response.model';
import { CultivationHistoryRecord } from '../data-model/cultivation-history-record.model';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, Observable, Subject, Subscription, catchError, map, switchMap } from 'rxjs';
import { confirmDialog } from '../../shared/utils/confirm.operator';
import { HarvestHistoryRecord } from '../data-model/harvest-history-record.model';
import { CreateHarvestHistoryRecordRequest } from '../data-model/create-harvest-history-record-request.model';
import { FertilizationHistoryRecordRequest } from '../data-model/create-fertilization-history-record-request.model';
import { FertilizationHistoryRecord } from '../data-model/fertilization-history-record.model';

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
  deleteCultivationHistoryRecord$: Subject<{fieldId: string, historyRecordId: string}> = new Subject<{fieldId: string, historyRecordId: string}>();
  addHarvestHistoryRecord$: Subject<{fieldId: string, record: CreateHarvestHistoryRecordRequest}> = new Subject();
  addFertiliziationHistoryRecord$: Subject<{fieldId: string, record: FertilizationHistoryRecordRequest}> = new Subject();

  constructor(
    public http: HttpClient,
  ) { 
    this.deleteCultivationHistoryRecord$.pipe(
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

    this.addHarvestHistoryRecord$.pipe(
      takeUntilDestroyed(),
      switchMap(data => this.addHarvestHistoryRecord(data.fieldId, data.record).pipe(map(res => new HarvestHistoryRecord(res.id, data.record.date, 'harvest', data.record.amount, data.record.cropType, data.record.humidity))))
    ).subscribe({
      next: harvestHistoryRecord => this.state.update(state => ({
        ...state,
        data: [harvestHistoryRecord, ...state.data],
      })),
      error: err => this.state.update(state => ({
        ...state,
        error: err
      }))
    });

    this.addFertiliziationHistoryRecord$.pipe(
      takeUntilDestroyed(),
      switchMap(data => this.addFertilizationHistoryRecord(data.fieldId, data.record).pipe(map(res => new FertilizationHistoryRecord(res.id, data.record.date, 'fertilization', data.record.fertilizerType, data.record.amount))))
    ).subscribe({
      next: fertilizationHistoryRecord => this.state.update(state => ({
        ...state,
        data: [fertilizationHistoryRecord, ...state.data],
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

  private addHarvestHistoryRecord(fieldId: string, request: CreateHarvestHistoryRecordRequest) {
    return this.http.post<{id: string}>(this.URL + fieldId + '/history/harvest', request);
  }

  private addFertilizationHistoryRecord(fieldId: string, request: FertilizationHistoryRecordRequest) {
    return this.http.post<{id: string}>(this.URL + fieldId + '/history/fertilization', request);
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
