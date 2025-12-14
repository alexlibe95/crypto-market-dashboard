import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import { CryptoEffects } from './features/crypto/store/crypto.effects';
import { cryptoReducer, cryptoFeatureKey } from './features/crypto/store/crypto.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideEffects(CryptoEffects),
    provideStore({
      [cryptoFeatureKey]: cryptoReducer,
    }),
  ],
};
