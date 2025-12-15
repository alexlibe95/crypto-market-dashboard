import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { DecimalPipe, UpperCasePipe } from '@angular/common';
import { Store } from '@ngrx/store';

import { selectError, selectFilteredCryptos, selectLoading } from '../../../store/crypto.selectors';
import { formatSmallNumber } from '../../../../../core/utils/format-small-number';

@Component({
  selector: 'app-crypto-table',
  imports: [DecimalPipe, UpperCasePipe],
  templateUrl: './crypto-table.component.html',
  styleUrl: './crypto-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CryptoTableComponent {
  private readonly store = inject(Store);

  readonly formatSmallNumber = formatSmallNumber;

  readonly cryptos = this.store.selectSignal(selectFilteredCryptos);
  readonly loading = this.store.selectSignal(selectLoading);
  readonly error = this.store.selectSignal(selectError);
}
