import { CryptoCurrency } from '../../../core/models/crypto.model';

// Types
export type SortDirection = 'asc' | 'desc' | null;

// Interfaces
export interface CryptoFilters {
  name: string;
  symbol: string;
  minMarketCap: number | null;
  maxMarketCap: number | null;
  minPriceChange: number | null;
  maxPriceChange: number | null;
}

export interface CryptoSort {
  active: keyof CryptoCurrency | null;
  direction: SortDirection;
}

export interface CryptoPagination {
  pageIndex: number;
  pageSize: number;
}

export interface CryptoState {
  // Data
  data: CryptoCurrency[];
  loading: boolean;
  error: string | null;

  // User interactions
  filters: CryptoFilters;
  sort: CryptoSort;
  search: string;
  pagination: CryptoPagination;
}

// Initial state
export const initialCryptoState: CryptoState = {
  data: [],
  loading: false,
  error: null,
  filters: {
    name: '',
    symbol: '',
    minMarketCap: null,
    maxMarketCap: null,
    minPriceChange: null,
    maxPriceChange: null,
  },
  sort: {
    active: null,
    direction: null,
  },
  search: '',
  pagination: {
    pageIndex: 0,
    pageSize: 50,
  },
};
