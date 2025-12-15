import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideStore } from '@ngrx/store';

import { CryptoFiltersComponent } from './crypto-filters.component';

describe('CryptoFiltersComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoFiltersComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideBrowserGlobalErrorListeners(),
        provideStore(),
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(CryptoFiltersComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
