import { CryptoCurrency } from '../../../core/models/crypto.model';

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
};
