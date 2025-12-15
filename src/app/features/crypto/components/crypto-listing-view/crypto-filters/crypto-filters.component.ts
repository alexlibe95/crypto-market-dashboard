import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';

import * as CryptoActions from '../../../store/crypto.actions';

@Component({
  selector: 'app-crypto-filters',
  templateUrl: './crypto-filters.component.html',
  styleUrl: './crypto-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CryptoFiltersComponent {
  private readonly store = inject(Store);

  readonly name = signal('');
  readonly symbol = signal('');
  readonly minMarketCap = signal<number | null>(null);

  updateName(value: string) {
    this.store.dispatch(CryptoActions.updateFilters({ filters: { name: value } }));
  }

  updateSymbol(value: string) {
    this.store.dispatch(CryptoActions.updateFilters({ filters: { symbol: value } }));
  }

  updateMarketCap(value: number | null) {
    this.store.dispatch(CryptoActions.updateFilters({ filters: { minMarketCap: value } }));
  }

  reset(): void {
    this.name.set('');
    this.symbol.set('');
    this.minMarketCap.set(null);
    this.store.dispatch(CryptoActions.resetFilters());
  }
}
