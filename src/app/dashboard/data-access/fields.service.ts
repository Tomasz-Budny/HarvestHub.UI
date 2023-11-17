import { Injectable, signal } from '@angular/core';
import { FieldViewModel } from '../data-model/field.model';
import { NEVER, delay, of } from 'rxjs';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { HarvestHubResponse } from '../../shared/data-model/harvest-hub-response.model';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {
  private state = signal<HarvestHubResponse<FieldViewModel[]>>({
    data: [],
    loaded: false,
    error: null
  });

  constructor() { 
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
    const fields = [
      {name: 'Działka #1', area: 3.17, address: 'Żebry Kordy', color: '#324C08'},
      {name: 'Działka #2', area: 4.01, address: 'Żebry Kordy', color: '#E6E5A3'},
      {name: 'Działka #3', area: 6.17, address: 'Żebry Kordy', color: '#856035'},
      {name: 'Działka #4', area: 3.23, address: 'Żebry Kordy', color: '#DAC92E'},
      {name: 'Działka #5', area: 8.02, address: 'Żebry Kordy', color: '#647D3B'},
      {name: 'Działka #6', area: 4.01, address: 'Żebry Kordy', color: '#E6E5A3'},
      {name: 'Działka #7', area: 6.17, address: 'Żebry Kordy', color: '#856035'},
      {name: 'Działka #8', area: 3.23, address: 'Żebry Kordy', color: '#DAC92E'},
      {name: 'Działka #9', area: 8.02, address: 'Żebry Kordy', color: '#647D3B'},
      {name: 'Działka #10', area: 1.00, address: 'Żebry Kordy', color: '#C1C35D'},
    ];

    return NEVER;

    return of(fields).pipe(
      delay(1000),
      takeUntilDestroyed()
    )
  }
}
