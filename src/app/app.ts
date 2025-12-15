import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';

import * as CryptoActions from './features/crypto/store/crypto.actions';
import { CryptoListingViewComponent } from './features/crypto/components/crypto-listing-view/crypto-listing-view.component';

@Component({
  selector: 'app-root',
  imports: [CryptoListingViewComponent],
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
