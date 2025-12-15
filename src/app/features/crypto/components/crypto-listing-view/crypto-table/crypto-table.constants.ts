import { CryptoCurrency } from '../../../../../core/models/crypto.model';

export interface TableColumnConfig {
  key: keyof CryptoCurrency;
  label: string;
  align: 'left' | 'right';
  additionalClasses?: string;
  sortable: boolean;
}

export const CRYPTO_TABLE_COLUMNS: TableColumnConfig[] = [
  {
    key: 'id',
    label: 'ID',
    align: 'left',
    additionalClasses: 'max-w-[120px]',
    sortable: true,
  },
  {
    key: 'name',
    label: 'Name',
    align: 'left',
    additionalClasses: 'max-w-[150px]',
    sortable: true,
  },
  {
    key: 'symbol',
    label: 'Symbol',
    align: 'left',
    additionalClasses: 'whitespace-nowrap',
    sortable: true,
  },
  {
    key: 'current_price',
    label: 'Price (USD)',
    align: 'right',
    additionalClasses: 'whitespace-nowrap',
    sortable: true,
  },
  {
    key: 'market_cap',
    label: 'Market Cap',
    align: 'right',
    additionalClasses: 'whitespace-nowrap',
    sortable: true,
  },
  {
    key: 'total_volume',
    label: 'Total Volume',
    align: 'right',
    additionalClasses: 'whitespace-nowrap',
    sortable: true,
  },
  {
    key: 'high_24h',
    label: 'High 24h',
    align: 'right',
    additionalClasses: 'whitespace-nowrap',
    sortable: true,
  },
  {
    key: 'low_24h',
    label: 'Low 24h',
    align: 'right',
    additionalClasses: 'whitespace-nowrap',
    sortable: true,
  },
  {
    key: 'price_change_percentage_24h',
    label: 'Price Change % (24h)',
    align: 'right',
    additionalClasses: 'whitespace-nowrap',
    sortable: true,
  },
  {
    key: 'circulating_supply',
    label: 'Circulating Supply',
    align: 'right',
    additionalClasses: 'whitespace-nowrap',
    sortable: true,
  },
] as const;
