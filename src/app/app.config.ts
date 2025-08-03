import { ApplicationConfig, APP_INITIALIZER, Provider, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { tokenInterceptor } from './core/shared/auth/token.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export function clearToken(): () => Promise<void> {
  return () => {
    localStorage.removeItem('token');
    localStorage.removeItem('auth_token');
    return Promise.resolve();
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideAnimationsAsync(),
    {
      provide: APP_INITIALIZER,
      useFactory: clearToken,
      multi: true
    }
  ]
};

