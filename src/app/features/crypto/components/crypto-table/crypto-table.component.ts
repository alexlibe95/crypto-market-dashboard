import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { DecimalPipe, UpperCasePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectCryptos, selectLoading } from '../../store/crypto.selectors';
import * as CryptoActions from '../../store/crypto.actions';

@Component({
  selector: 'app-crypto-table',
  imports: [DecimalPipe, UpperCasePipe],
  templateUrl: './crypto-table.component.html',
  styleUrl: './crypto-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CryptoTableComponent {
  private store = inject(Store);

  readonly cryptos = this.store.selectSignal(selectCryptos);
  readonly loading = this.store.selectSignal(selectLoading);

  constructor() {
    this.store.dispatch(CryptoActions.loadCryptos());
  }
}
