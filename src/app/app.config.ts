import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { httpInterceptorProviders } from './interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding()),
  importProvidersFrom(HttpClientModule),
  provideAnimations(), // required animations providers
    MessageService,
    httpInterceptorProviders
  ]
};
