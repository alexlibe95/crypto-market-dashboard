import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CryptoFiltersComponent } from './crypto-filters/crypto-filters.component';
import { CryptoTableComponent } from './crypto-table/crypto-table.component';

@Component({
  selector: 'app-crypto-listing-view',
  imports: [CryptoFiltersComponent, CryptoTableComponent],
  templateUrl: './crypto-listing-view.component.html',
  styleUrl: './crypto-listing-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CryptoListingViewComponent {}
