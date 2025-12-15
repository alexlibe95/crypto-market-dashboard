import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideStore } from '@ngrx/store';

import { CryptoSearchComponent } from './crypto-search.component';

describe('CryptoSearchComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoSearchComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideBrowserGlobalErrorListeners(),
        provideStore(),
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(CryptoSearchComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
