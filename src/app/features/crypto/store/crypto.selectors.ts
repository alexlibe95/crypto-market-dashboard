import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CryptoFilters, CryptoState } from './crypto.state';
import { cryptoFeatureKey } from './crypto.reducer';
import { CryptoCurrency } from '../../../core/models/crypto.model';

export const selectCryptoState = createFeatureSelector<CryptoState>(cryptoFeatureKey);

export const selectCryptos = createSelector(selectCryptoState, (state) => state.data);

export const selectLoading = createSelector(selectCryptoState, (state) => state.loading);

export const selectError = createSelector(selectCryptoState, (state) => state.error);

export const selectFilters = createSelector(selectCryptoState, (state) => state.filters);

export const selectFilteredCryptos = createSelector(
  selectCryptos,
  selectFilters,
  (cryptos: CryptoCurrency[], filters: CryptoFilters) =>
    cryptos.filter((crypto) => {
      const matchesName =
        !filters.name || crypto.name.toLowerCase().includes(filters.name.toLowerCase());

      const matchesSymbol =
        !filters.symbol || crypto.symbol.toLowerCase().includes(filters.symbol.toLowerCase());

      const matchesMarketCap =
        filters.minMarketCap == null || crypto.market_cap >= filters.minMarketCap;

      return matchesName && matchesSymbol && matchesMarketCap;
    })
);
