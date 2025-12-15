import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { Store } from '@ngrx/store';
import { vi } from 'vitest';

import { CryptoTableComponent } from './crypto-table.component';
import * as CryptoActions from '../../../store/crypto.actions';
import { CryptoCurrency } from '../../../../../core/models/crypto.model';

describe('CryptoTableComponent', () => {
  let component: CryptoTableComponent;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoTableComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideBrowserGlobalErrorListeners(),
        provideStore(),
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(CryptoTableComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have columns defined', () => {
    expect(component.columns).toBeDefined();
    expect(component.columns.length).toBeGreaterThan(0);
  });

  it('should dispatch updateSort action when sortBy is called', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.sortBy('name' as keyof CryptoCurrency);
    expect(dispatchSpy).toHaveBeenCalledWith(CryptoActions.updateSort({ active: 'name' }));
  });
});
