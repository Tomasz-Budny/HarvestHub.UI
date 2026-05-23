import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseUrlService {
  baseUrl = 'https://localhost:7258/api/';
  urlsToInjectAuthHeader = [this.baseUrl, 'https://localhost:7260/api']

  constructor() { }

  createUrl(url: string = '') {
    if (url.startsWith('/')) {
      url = url.substring(1);
    }
    return this.baseUrl + url;
  }
}
