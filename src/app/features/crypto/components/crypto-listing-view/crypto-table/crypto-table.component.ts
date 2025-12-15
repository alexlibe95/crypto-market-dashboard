import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { DecimalPipe, UpperCasePipe } from '@angular/common';
import { Store } from '@ngrx/store';

import {
  selectError,
  selectLoading,
  selectVisibleCryptos,
  selectSort,
} from '../../../store/crypto.selectors';
import { FormattedPriceComponent } from './formatted-price/formatted-price.component';
import { TableHeaderComponent } from './table-header/table-header.component';
import { CRYPTO_TABLE_COLUMNS } from '../../../../../core/constants/crypto-table.constants';
import { CryptoCurrency } from '../../../../../core/models/crypto.model';
import * as CryptoActions from '../../../store/crypto.actions';

@Component({
  selector: 'app-crypto-table',
  imports: [DecimalPipe, UpperCasePipe, FormattedPriceComponent, TableHeaderComponent],
  templateUrl: './crypto-table.component.html',
  styleUrl: './crypto-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CryptoTableComponent {
  private readonly store = inject(Store);

  readonly cryptos = this.store.selectSignal(selectVisibleCryptos);
  readonly loading = this.store.selectSignal(selectLoading);
  readonly error = this.store.selectSignal(selectError);
  readonly sort = this.store.selectSignal(selectSort);

  readonly columns = CRYPTO_TABLE_COLUMNS;

  readonly sortBy = (column: keyof CryptoCurrency): void => {
    this.store.dispatch(CryptoActions.updateSort({ active: column }));
  };

  isSortedBy(column: keyof CryptoCurrency): boolean {
    return this.sort().active === column;
  }

  getSortDirection(column: keyof CryptoCurrency): 'asc' | 'desc' | null {
    if (this.sort().active !== column) return null;
    return this.sort().direction ?? null;
  }
}
