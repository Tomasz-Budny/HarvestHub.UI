import { Injectable, Signal, computed, signal } from '@angular/core';
import { AddressViewModel } from '../data-model/address.model';
import { StartLocation } from '../data-model/start-location.model';
import { Observable, Subject, delay, of, switchMap, tap } from 'rxjs';
import { HarvestHubResponse } from '../../shared/data-model/harvest-hub-response.model';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MapService } from './map.service';
import { CoordinatesViewModel } from '../data-model/coordinates.model';
import { HttpClient } from '@angular/common/http';
import { HarvestHubError } from '../../shared/data-model/harvest-hub-error.model';
import { AuthService } from '../../auth/data-access/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  URL = 'https://localhost:7258/api/owners';

  private state = signal<HarvestHubResponse<StartLocation>>({
    data: null,
    loaded: false,
    error: null
  });

  startLocation: Signal<StartLocation> = computed(() => this.state().data);
  loaded: Signal<boolean> = computed(() => this.state().loaded);
  error: Signal<HarvestHubError> = computed(() => this.state().error)
  changeStartLocation$: Subject<CoordinatesViewModel> = new Subject<CoordinatesViewModel>();
  loadStartLocation$: Subject<void> = new Subject();

  constructor(
    public http: HttpClient,
    private mapService: MapService,
    private authService: AuthService
  ) { 
    this.authService.beforeLogout$.pipe(
      takeUntilDestroyed()
    ).subscribe(_ => this.state.set({
      data: null,
      loaded: false,
      error: null
    }));
    
    this.loadStartLocation$.pipe(
      switchMap(_ => this.getStartLocationApi()),
      tap(startLocation => this.mapService.focus(startLocation.coordinates))
    ).subscribe({
      next: (res) => this.state.update(state => ({
        ...state,
        data: res,
        loaded: true
      })),
      error: (err) => this.state.update(state => ({
        ...state,
        error: err
      }))
    });

    this.changeStartLocation$.pipe(
      takeUntilDestroyed(),
      switchMap(coords => this.updateStartLocationApi(coords)),
      switchMap(_ => this.getStartLocationApi())
    ).subscribe({
      next: (res) => this.state.update(state => ({
        ...state,
        data: res,
        loaded: true
      })),
      error: (err) => this.state.update(state => ({
        ...state,
        error: err
      }))
    });
  }

  loadStartLocation() {
    this.loadStartLocation$.next();
  }

  private updateStartLocationApi(coords: CoordinatesViewModel) {
    return this.http.post(this.URL + '/start_location', {
      point: coords
    });
  }

  private getStartLocationApi(): Observable<StartLocation> {
    return this.http.get<StartLocation>(this.URL + '/start_location');
  }
}
