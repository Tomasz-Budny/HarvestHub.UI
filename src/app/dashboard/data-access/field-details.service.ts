import { Injectable, signal } from '@angular/core';
import { HarvestHubResponse } from '../../shared/data-model/harvest-hub-response.model';
import { FieldDetailsViewModel } from '../data-model/field-details.model';

@Injectable({
  providedIn: 'root'
})
export class FieldDetailsService {
  URL = 'https://localhost:7258/api/fields/'

  private state = signal<HarvestHubResponse<FieldDetailsViewModel[]>>({
    data: [],
    loaded: false,
    error: null
  });

  constructor() { }


}
