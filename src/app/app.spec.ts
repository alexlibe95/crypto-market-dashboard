import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideStore } from '@ngrx/store';

import { App } from './app';
import { CryptoTableComponent } from './features/crypto/components/crypto-listing-view/crypto-table/crypto-table.component';
import { CryptoFiltersComponent } from './features/crypto/components/crypto-listing-view/crypto-filters/crypto-filters.component';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, CryptoTableComponent, CryptoFiltersComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideBrowserGlobalErrorListeners(),
        provideStore(),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
