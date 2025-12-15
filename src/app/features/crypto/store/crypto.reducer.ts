import { createReducer, on } from '@ngrx/store';

import * as CryptoActions from './crypto.actions';
import { initialCryptoState } from './crypto.state';
import { CryptoCurrency } from '../../../core/models/crypto.model';

export const cryptoFeatureKey = 'crypto';

export const cryptoReducer = createReducer(
  initialCryptoState,

  on(CryptoActions.loadCryptos, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(CryptoActions.loadCryptosSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    data,
  })),

  on(CryptoActions.loadCryptosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(CryptoActions.updateFilters, (state, { filters }) => ({
    ...state,
    filters: {
      ...state.filters,
      ...filters,
    },
  })),

  on(CryptoActions.resetFilters, (state) => ({
    ...state,
    filters: initialCryptoState.filters,
  })),

  on(CryptoActions.updateSort, (state, { active }) => {
    const isSameColumn = state.sort.active === active;
    
    // 3-click cycle: asc -> desc -> null (reset)
    let direction: 'asc' | 'desc' | null = 'asc';
    let newActive: keyof CryptoCurrency | null = active;
    
    if (isSameColumn) {
      if (state.sort.direction === 'asc') {
        direction = 'desc';
      } else if (state.sort.direction === 'desc') {
        direction = null;
        newActive = null; // Reset active when direction is null
      }
    }

    return {
      ...state,
      sort: { active: newActive, direction },
    };
  })
);
