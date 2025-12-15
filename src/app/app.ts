import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';

import * as CryptoActions from './features/crypto/store/crypto.actions';
import { CryptoControlsComponent } from './features/crypto/components/crypto-controls/crypto-controls.component';
import { CryptoTabViewComponent } from './features/crypto/components/crypto-tab-view/crypto-tab-view.component';

@Component({
  selector: 'app-root',
  imports: [CryptoControlsComponent, CryptoTabViewComponent],
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
