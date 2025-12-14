import { CryptoCurrency } from '../../../core/models/crypto.model';

export interface CryptoState {
  data: CryptoCurrency[];
  loading: boolean;
  error: string | null;
}

export const initialCryptoState: CryptoState = {
  data: [],
  loading: false,
  error: null
};
