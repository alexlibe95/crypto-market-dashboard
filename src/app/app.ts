import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';

import { CryptoTableComponent } from './features/crypto/components/crypto-table/crypto-table.component';
import * as CryptoActions from './features/crypto/store/crypto.actions';

@Component({
  selector: 'app-root',
  imports: [CryptoTableComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('crypto-market-dashboard');
  private store = inject(Store);
  constructor() {
    this.store.dispatch(CryptoActions.loadCryptos());
  }
}
