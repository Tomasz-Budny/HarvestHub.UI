import { Injectable, Signal, signal } from '@angular/core';
import { AddressViewModel } from '../data-model/address.model';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  readonly #coordinates = signal({lat: 30, lng: 50});
  readonly #address = signal(new AddressViewModel("Wielka Brytania", "", "", "Londyn"));

  getCoordinates(): Signal<{lat: number, lng: number}> {
    return this.#coordinates.asReadonly();
  }

  getAddress() {
    return this.#address.asReadonly();
  }

  constructor() { }
}
