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
  private store = inject(Store);

  readonly name = signal('');
  readonly symbol = signal('');
  readonly minMarketCap = signal<number | null>(null);

  applyFilters(): void {
    this.store.dispatch(
      CryptoActions.updateFilters({
        filters: {
          name: this.name(),
          symbol: this.symbol(),
          minMarketCap: this.minMarketCap(),
        },
      })
    );
  }

  reset(): void {
    this.name.set('');
    this.symbol.set('');
    this.minMarketCap.set(null);
    this.store.dispatch(CryptoActions.resetFilters());
  }
}
