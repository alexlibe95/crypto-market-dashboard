import { Component, ChangeDetectionStrategy } from '@angular/core';

import { CryptoSearchComponent } from './crypto-search/crypto-search.component';
import { CryptoFiltersComponent } from './crypto-filters/crypto-filters.component';

@Component({
  selector: 'app-crypto-controls',
  imports: [CryptoSearchComponent, CryptoFiltersComponent],
  templateUrl: './crypto-controls.component.html',
  styleUrl: './crypto-controls.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CryptoControlsComponent {}
