import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import * as CryptoActions from './features/crypto/store/crypto.actions';
import { selectCryptos, selectLoading } from './features/crypto/store/crypto.selectors';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private store = inject(Store);

  protected readonly title = signal('crypto-market-dashboard');

  readonly loading$ = this.store.selectSignal(selectLoading);
  readonly cryptos$ = this.store.selectSignal(selectCryptos);

  constructor() {
        // dispatch once - temporary smoke test
        this.store.dispatch(CryptoActions.loadCryptos());

        // react to state changes - temporary smoke test
        effect(() => {
          console.log('Loading (signal):', this.loading$());
          console.log('Cryptos (signal):', this.cryptos$());
        });
  }
}
