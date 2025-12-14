import { createReducer, on } from '@ngrx/store';

import * as CryptoActions from './crypto.actions';
import { initialCryptoState } from './crypto.state';

export const cryptoFeatureKey = 'crypto';

export const cryptoReducer = createReducer(
  initialCryptoState,

  on(CryptoActions.loadCryptos, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(CryptoActions.loadCryptosSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    data
  })),

  on(CryptoActions.loadCryptosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
