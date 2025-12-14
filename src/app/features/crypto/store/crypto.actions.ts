import { createAction, props } from '@ngrx/store';

import { CryptoCurrency } from '../../../core/models/crypto.model';

export const loadCryptos = createAction('[Crypto] Load Cryptocurrencies');

export const loadCryptosSuccess = createAction(
  '[Crypto] Load Cryptocurrencies Success',
  props<{ data: CryptoCurrency[] }>()
);

export const loadCryptosFailure = createAction(
  '[Crypto] Load Cryptocurrencies Failure',
  props<{ error: string }>()
);
