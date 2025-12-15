import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { DecimalPipe, UpperCasePipe } from '@angular/common';
import { Store } from '@ngrx/store';

import { selectError, selectLoading, selectSortedCryptos } from '../../../store/crypto.selectors';
import { FormattedPriceComponent } from './formatted-price/formatted-price.component';
import { CryptoCurrency } from '../../../../../core/models/crypto.model';
import * as CryptoActions from '../../../store/crypto.actions';

@Component({
  selector: 'app-crypto-table',
  imports: [DecimalPipe, UpperCasePipe, FormattedPriceComponent],
  templateUrl: './crypto-table.component.html',
  styleUrl: './crypto-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CryptoTableComponent {
  private readonly store = inject(Store);

  readonly cryptos = this.store.selectSignal(selectSortedCryptos);
  readonly loading = this.store.selectSignal(selectLoading);
  readonly error = this.store.selectSignal(selectError);

  sortBy(column: keyof CryptoCurrency): void {
    this.store.dispatch(CryptoActions.updateSort({ active: column }));
  }
}
