import { Injectable, Signal, computed, signal } from '@angular/core';
import { AddressViewModel } from '../data-model/address.model';
import { StartLocation } from '../data-model/start-location.model';
import { delay, of, tap } from 'rxjs';
import { HarvestHubResponse } from '../../shared/data-model/harvest-hub-response.model';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  private state = signal<HarvestHubResponse<StartLocation>>({
    data: null,
    loaded: false,
    error: null
  });

  startLocation: Signal<StartLocation> = computed(() => this.state().data);
  loaded: Signal<boolean> = computed(() => this.state().loaded);

  constructor(
    private mapService: MapService
  ) { 
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
      {lat: 53.0518, lng: 20.703},
      new AddressViewModel("Polska", "", "", "Żebry-Kordy")
    )).pipe(
      takeUntilDestroyed(),
      delay(1000),
      tap(startLocation => this.mapService.focus(startLocation.coordinates))
    )
  }

}
