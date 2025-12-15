import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as CryptoActions from '../../../store/crypto.actions';

@Component({
  selector: 'app-crypto-search',
  templateUrl: './crypto-search.component.html',
  styleUrl: './crypto-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CryptoSearchComponent {
  private store = inject(Store);

  update(value: string): void {
    this.store.dispatch(CryptoActions.updateSearch({ search: value }));
  }

  clear(): void {
    this.store.dispatch(CryptoActions.clearSearch());
  }
}
