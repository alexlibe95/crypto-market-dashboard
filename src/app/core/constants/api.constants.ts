export const COINGECKO_API = {
  BASE_URL: 'https://api.coingecko.com/api/v3',

  ENDPOINTS: {
    MARKETS: '/coins/markets',
  },

  PARAMS: {
    VS_CURRENCY: 'vs_currency',
    ORDER: 'order',
    PER_PAGE: 'per_page',
    PAGE: 'page',
    SPARKLINE: 'sparkline',
  },

  DEFAULT_PARAMS: {
    VS_CURRENCY: 'usd',
    ORDER: 'market_cap_desc',
    PER_PAGE: 250,
    PAGE: 1,
    SPARKLINE: false,
  },
} as const;
