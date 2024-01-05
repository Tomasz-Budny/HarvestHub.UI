import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { AuthInterceptor } from './auth/utils/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: MAT_DATE_LOCALE, 
      useValue: 'pl-PL'
    },
    importProvidersFrom([
      HttpClientModule, 
      HttpClientJsonpModule, 
      MatNativeDateModule,
    ]),
    provideRouter(routes),
    provideAnimations()
  ]
};
