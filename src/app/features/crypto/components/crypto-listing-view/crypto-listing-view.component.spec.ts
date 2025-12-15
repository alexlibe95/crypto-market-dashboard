import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideStore } from '@ngrx/store';

import { CryptoListingViewComponent } from './crypto-listing-view.component';
import { CryptoTableComponent } from './crypto-table/crypto-table.component';
import { CryptoFiltersComponent } from './crypto-filters/crypto-filters.component';

describe('CryptoListingViewComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoListingViewComponent, CryptoFiltersComponent, CryptoTableComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideBrowserGlobalErrorListeners(),
        provideStore(),
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(CryptoListingViewComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
