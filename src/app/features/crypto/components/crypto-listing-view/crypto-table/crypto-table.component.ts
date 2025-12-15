import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { DecimalPipe, UpperCasePipe } from '@angular/common';
import { Store } from '@ngrx/store';

import { selectError, selectFilteredCryptos, selectLoading } from '../../../store/crypto.selectors';
import { FormattedPriceComponent } from './formatted-price/formatted-price.component';

@Component({
  selector: 'app-crypto-table',
  imports: [DecimalPipe, UpperCasePipe, FormattedPriceComponent],
  templateUrl: './crypto-table.component.html',
  styleUrl: './crypto-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CryptoTableComponent {
  private readonly store = inject(Store);

  readonly cryptos = this.store.selectSignal(selectFilteredCryptos);
  readonly loading = this.store.selectSignal(selectLoading);
  readonly error = this.store.selectSignal(selectError);
}
