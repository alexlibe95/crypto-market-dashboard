import { createAction, props } from '@ngrx/store';

import { CryptoCurrency } from '../../../core/models/crypto.model';
import { CryptoFilters } from './crypto.state';

export const loadCryptos = createAction('[Crypto] Load Cryptocurrencies');

export const loadCryptosSuccess = createAction(
  '[Crypto] Load Cryptocurrencies Success',
  props<{ data: CryptoCurrency[] }>()
);

export const loadCryptosFailure = createAction(
  '[Crypto] Load Cryptocurrencies Failure',
  props<{ error: string }>()
);

export const updateFilters = createAction(
  '[Crypto] Update Filters',
  props<{ filters: Partial<CryptoFilters> }>()
);

export const resetFilters = createAction('[Crypto] Reset Filters');
