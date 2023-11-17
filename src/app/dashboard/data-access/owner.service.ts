import { Injectable, Signal, computed, signal } from '@angular/core';
import { AddressViewModel } from '../data-model/address.model';
import { StartLocation } from '../data-model/start-location.model';
import { delay, of } from 'rxjs';
import { HarvestHubResponse } from '../../shared/data-model/harvest-hub-response.model';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  private state = signal<HarvestHubResponse<StartLocation>>({
    data: null,
    loaded: false,
    error: null
  });

  startLocation = computed(() => this.state().data);
  loaded = computed(() => this.state().loaded);

  constructor() { 
    this.loadStartLocation().subscribe({
      next: (res) => this.state.update(state => ({
        ...state,
        data: res,
        loaded: true
      })),
      error: (err) => this.state.update(state => ({
        ...state,
        error: err
      }))
    })
  }

  loadStartLocation() {
    return of(new StartLocation(
      {lat: 30, lng: 50},
      new AddressViewModel("Polska", "", "", "Warszawa")
    )).pipe(
      takeUntilDestroyed(),
      delay(1000)
    )
  }

}
