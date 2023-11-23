import { Injectable, Signal, computed, signal } from '@angular/core';
import { FieldViewModel } from '../data-model/field.model';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { HarvestHubResponse } from '../../shared/data-model/harvest-hub-response.model';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, Subject, catchError, map, switchMap, tap } from 'rxjs';
import { confirmDialog } from '../../shared/utils/confirm.operator';
import { CreateFieldRequest } from '../data-model/create-field-request.model';
import { Polygon } from '../data-model/polygon.model';
import { ColorUtil } from '../utils/color.util';
import { ReplaceFieldVerticesRequest } from '../data-model/replace-field-vertices-request.model';

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
  replaceFieldVertices$ = new Subject<ReplaceFieldVerticesRequest>()

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
      switchMap(polygon => this.addFieldApi(polygon)),
      switchMap(res => this.getFieldApi(res.id))
    ).subscribe({
      next: field => this.state.update(state => ({
        ...state,
        data: [...state.data, field],
        loaded: true
      })),
      error: err => this.state.update(state => ({
        ...state,
        error: err
      }))
    });

    this.replaceFieldVertices$.pipe(
      takeUntilDestroyed(),
      switchMap(request => this.replaceFieldVerticesApi(request).pipe(map(_ => request)))
    ).subscribe({
      next: req => this.state.update(state => ({
        ...state,
        data: this.updateFieldPolygon(req.polygon, req.fieldId),
        loaded: true
      })),
      error: err => this.state.update(state => ({
        ...state,
        error: err
      }))
    })
  }

  getField(fieldId: string) {
    return this.state().data.find(field => field.id === fieldId);
  }

  getFields() {
    return this.state.asReadonly();
  }

  private updateFieldPolygon(polygon: Polygon, fieldId: string) {
    const fields = this.state().data;
    const field = fields.find(field => field.id === fieldId);
    field.paths = polygon.vertices;
    field.area = polygon.area;
    field.center = polygon.center;

    return [...fields];
  }

  private loadFields() {
    return this.http.get<FieldViewModel[]>(this.URL).pipe(
      takeUntilDestroyed()
    );
  }

  private deleteFieldApi(fieldId: string): Observable<string> {
    return this.http.delete<string>(this.URL + `/${fieldId}`)
  }

  private getFieldApi(fieldId: string): Observable<FieldViewModel> {
    return this.http.get<FieldViewModel>(this.URL + `/${fieldId}`)
  }

  private addFieldApi(polygon: Polygon): Observable<{id: string}> {
    const fields = this.state().data;
    const lastField = fields[fields.length - 1];

    const name = `Działka #${fields.length + 1}`
    const color = ColorUtil.getRandomColorExcept(lastField === undefined ? '' : lastField.color );

    const newField: CreateFieldRequest = {
      name: name,
      center: polygon.center,
      area: polygon.area,
      color: color,
      vertices: polygon.vertices
    }

    return this.http.post<{id: string}>(this.URL, newField);
  }

  private replaceFieldVerticesApi(request: ReplaceFieldVerticesRequest): Observable<void> {
    const fieldId = request.fieldId;
    const polygon = request.polygon;

    return this.http.post<void>(this.URL + `/${fieldId}/vertices/replace`, polygon);
  }
}
