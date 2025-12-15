import { CryptoCurrency } from '../../../core/models/crypto.model';

export type SortDirection = 'asc' | 'desc';


export interface CryptoSort {
  active: keyof CryptoCurrency | null;
  direction: SortDirection;
}

export interface CryptoFilters {
  name: string;
  symbol: string;
  minMarketCap: number | null;
  maxMarketCap: number | null;
  minPriceChange: number | null;
  maxPriceChange: number | null;
}

export interface CryptoState {
  data: CryptoCurrency[];
  loading: boolean;
  error: string | null;
  filters: CryptoFilters;
  sort: CryptoSort;
}

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
    direction: 'asc'
  }
};
