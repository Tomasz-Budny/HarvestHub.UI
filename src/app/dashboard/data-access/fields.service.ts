import { Injectable, signal } from '@angular/core';
import { Field } from '../data-model/field.model';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {
  readonly #fields = signal<Field[]>([])

  getFields() {
    return this.#fields.asReadonly();
  }

  setFields() {
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

    this.#fields.set(fields);
  }

  constructor() { }
}
