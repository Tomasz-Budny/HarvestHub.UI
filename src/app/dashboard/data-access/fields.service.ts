import { Injectable, Signal, computed, signal } from '@angular/core';
import { FieldViewModel } from '../data-model/field.model';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { HarvestHubResponse } from '../../shared/data-model/harvest-hub-response.model';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Subject, catchError, switchMap, tap } from 'rxjs';
import { confirmDialog } from '../../shared/utils/confirm.operator';
import { CreateFieldRequest } from '../data-model/create-field-request.model';
import { Polygon } from '../data-model/polygon.model';

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
  remove$ = new Subject<string>();
  add$ = new Subject<Polygon>();

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

    this.remove$.asObservable().pipe(
      tap(fieldId => console.log(fieldId)),
      confirmDialog(fieldId => {
        return this.deleteFieldApi(fieldId)
        .pipe(
          catchError(_ => EMPTY)
        )
      })
    ).subscribe({
      next: fieldId => this.state.update(state => ({
        ...state,
        data: state.data.filter(field => field.id !== fieldId),
        loaded: true
      })),
      error: err => this.state.update(state => ({
        ...state,
        error: err
      }))
    });

    this.add$.asObservable().pipe(
      takeUntilDestroyed(),
      switchMap(polygon => this.addFieldApi(polygon))
    ).subscribe()
  }

  getFields() {
    return this.state.asReadonly();
  }

  private loadFields() {
    return this.http.get<FieldViewModel[]>(this.URL).pipe(
      takeUntilDestroyed()
    );
  }

  private deleteFieldApi(fieldId: string) {
    return this.http.delete(this.URL + `/${fieldId}`)
  }

  private addFieldApi(polygon: Polygon) {
    const name = `Działka #${this.state().data.length}`
    const color = '#324C08';

    const newField: CreateFieldRequest = {
      name: name,
      center: polygon.center,
      area: polygon.area,
      color: color,
      vertices: polygon.vertices
    }

    return this.http.post<CreateFieldRequest>(this.URL, newField);
  }
}
