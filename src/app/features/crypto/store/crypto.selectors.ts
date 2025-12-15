import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CryptoFilters, CryptoState } from './crypto.state';
import { cryptoFeatureKey } from './crypto.reducer';
import { CryptoCurrency } from '../../../core/models/crypto.model';

// Base selector
export const selectCryptoState = createFeatureSelector<CryptoState>(cryptoFeatureKey);

// Simple state property selectors
export const selectCryptos = createSelector(selectCryptoState, (state) => state.data);
export const selectLoading = createSelector(selectCryptoState, (state) => state.loading);
export const selectError = createSelector(selectCryptoState, (state) => state.error);
export const selectFilters = createSelector(selectCryptoState, (state) => state.filters);
export const selectSort = createSelector(selectCryptoState, (state) => state.sort);
export const selectSearch = createSelector(selectCryptoState, (state) => state.search);

// Computed selectors (in dependency order)
export const selectMaxMarketCap = createSelector(selectCryptos, (cryptos: CryptoCurrency[]) => {
  if (!cryptos || cryptos.length === 0) return 0;
  return Math.max(...cryptos.map((crypto) => crypto.market_cap || 0));
});

export const selectFilteredCryptos = createSelector(
  selectCryptos,
  selectFilters,
  (cryptos: CryptoCurrency[], filters: CryptoFilters) =>
    cryptos.filter((crypto) => {
      const nameFilter = filters.name.trim();
      const symbolFilter = filters.symbol.trim();

      const matchesName =
        !nameFilter || crypto.name.toLowerCase().includes(nameFilter.toLowerCase());

      const matchesSymbol =
        !symbolFilter || crypto.symbol.toLowerCase().includes(symbolFilter.toLowerCase());

      const matchesMinMarketCap =
        filters.minMarketCap == null ||
        isNaN(filters.minMarketCap) ||
        crypto.market_cap >= filters.minMarketCap;
      const matchesMaxMarketCap =
        filters.maxMarketCap == null ||
        isNaN(filters.maxMarketCap) ||
        crypto.market_cap <= filters.maxMarketCap;
      const matchesMinPriceChange =
        filters.minPriceChange == null ||
        isNaN(filters.minPriceChange) ||
        crypto.price_change_percentage_24h >= filters.minPriceChange;
      const matchesMaxPriceChange =
        filters.maxPriceChange == null ||
        isNaN(filters.maxPriceChange) ||
        crypto.price_change_percentage_24h <= filters.maxPriceChange;

      return (
        matchesName &&
        matchesSymbol &&
        matchesMinMarketCap &&
        matchesMaxMarketCap &&
        matchesMinPriceChange &&
        matchesMaxPriceChange
      );
    })
);

export const selectSearchedCryptos = createSelector(
  selectFilteredCryptos,
  selectSearch,
  (cryptos, search) => {
    const trimmedSearch = search.trim();
    if (!trimmedSearch) return cryptos;

    const term = trimmedSearch.toLowerCase();

    return cryptos.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(term) ||
        crypto.symbol.toLowerCase().includes(term) ||
        crypto.id.toLowerCase().includes(term)
    );
  }
);

export const selectSortedCryptos = createSelector(
  selectSearchedCryptos,
  selectSort,
  (cryptos, sort) => {
    const { active, direction } = sort;

    if (!active || direction === null) return cryptos;

    return [...cryptos].sort((a, b) => {
      const aValue = a[active];
      const bValue = b[active];

      if (aValue == null || bValue == null) return 0;

      const comparison =
        typeof aValue === 'string'
          ? aValue.localeCompare(String(bValue))
          : Number(aValue) - Number(bValue);

      return direction === 'asc' ? comparison : -comparison;
    });
  }
);
