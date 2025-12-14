import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CryptoState } from './crypto.state';
import { cryptoFeatureKey } from './crypto.reducer';

export const selectCryptoState =
  createFeatureSelector<CryptoState>(cryptoFeatureKey);

export const selectCryptos = createSelector(
  selectCryptoState,
  state => state.data
);

export const selectLoading = createSelector(
  selectCryptoState,
  state => state.loading
);

export const selectError = createSelector(
  selectCryptoState,
  state => state.error
);
