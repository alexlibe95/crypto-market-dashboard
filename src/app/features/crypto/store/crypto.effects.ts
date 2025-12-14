import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import * as CryptoActions from './crypto.actions';
import { CoinGeckoService } from '../../../core/services/coingecko.service';

@Injectable()
export class CryptoEffects {
  private actions$ = inject(Actions);
  private coinGeckoService = inject(CoinGeckoService);

  loadCryptos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CryptoActions.loadCryptos),
      mergeMap(() =>
        this.coinGeckoService.getMarketData().pipe(
          map(data =>
            CryptoActions.loadCryptosSuccess({ data })
          ),
          catchError(error =>
            of(
              CryptoActions.loadCryptosFailure({
                error: error.message ?? 'Failed to load data'
              })
            )
          )
        )
      )
    )
  );
}
