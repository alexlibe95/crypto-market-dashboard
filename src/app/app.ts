import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { CryptoTableComponent } from './features/crypto/components/crypto-table/crypto-table.component';

@Component({
  selector: 'app-root',
  imports: [CryptoTableComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('crypto-market-dashboard');
}
