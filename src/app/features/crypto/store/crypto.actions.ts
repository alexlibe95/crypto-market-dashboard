import { createAction, props } from '@ngrx/store';

import { CryptoCurrency } from '../../../core/models/crypto.model';
import { CryptoFilters } from './crypto.state';

// ============================================================================
// Data Loading Actions
// ============================================================================
export const loadCryptos = createAction('[Crypto] Load Cryptocurrencies');

export const loadCryptosSuccess = createAction(
  '[Crypto] Load Cryptocurrencies Success',
  props<{ data: CryptoCurrency[] }>()
);

export const loadCryptosFailure = createAction(
  '[Crypto] Load Cryptocurrencies Failure',
  props<{ error: string }>()
);

// ============================================================================
// Filter Actions
// ============================================================================
export const updateFilters = createAction(
  '[Crypto] Update Filters',
  props<{ filters: Partial<CryptoFilters> }>()
);

export const resetFilters = createAction('[Crypto] Reset Filters');

// ============================================================================
// Sort Actions
// ============================================================================
export const updateSort = createAction(
  '[Crypto] Update Sort',
  props<{ active: keyof CryptoCurrency }>()
);

// ============================================================================
// Search Actions
// ============================================================================
export const updateSearch = createAction('[Crypto] Update Search', props<{ search: string }>());

export const clearSearch = createAction('[Crypto] Clear Search');

// ============================================================================
// Pagination Actions
// ============================================================================
export const setPageIndex = createAction('[Crypto] Set Page Index', props<{ pageIndex: number }>());

export const setPageSize = createAction('[Crypto] Set Page Size', props<{ pageSize: number }>());
