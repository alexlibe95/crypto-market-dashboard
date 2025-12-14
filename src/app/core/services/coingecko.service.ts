import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CryptoCurrency } from '../models/crypto.model';
import { COINGECKO_API } from '../constants/api.constants';

@Injectable({ providedIn: 'root' })
export class CoinGeckoService {
  private http = inject(HttpClient);

  getMarketData(
    page = COINGECKO_API.DEFAULT_PARAMS.PAGE,
    perPage = COINGECKO_API.DEFAULT_PARAMS.PER_PAGE
  ): Observable<CryptoCurrency[]> {
    const params = new HttpParams()
      .set(COINGECKO_API.PARAMS.VS_CURRENCY, COINGECKO_API.DEFAULT_PARAMS.VS_CURRENCY)
      .set(COINGECKO_API.PARAMS.ORDER, COINGECKO_API.DEFAULT_PARAMS.ORDER)
      .set(COINGECKO_API.PARAMS.PER_PAGE, perPage)
      .set(COINGECKO_API.PARAMS.PAGE, page)
      .set(COINGECKO_API.PARAMS.SPARKLINE, String(COINGECKO_API.DEFAULT_PARAMS.SPARKLINE));

    return this.http.get<CryptoCurrency[]>(
      `${COINGECKO_API.BASE_URL}${COINGECKO_API.ENDPOINTS.MARKETS}`,
      { params }
    );
  }
}
