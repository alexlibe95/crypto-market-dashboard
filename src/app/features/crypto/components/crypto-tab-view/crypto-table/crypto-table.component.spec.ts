import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideStore } from '@ngrx/store';

import { CryptoTableComponent } from './crypto-table.component';

describe('CryptoTableComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoTableComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideBrowserGlobalErrorListeners(),
        provideStore(),
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(CryptoTableComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
