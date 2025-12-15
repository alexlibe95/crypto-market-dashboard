import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { Store } from '@ngrx/store';
import { vi } from 'vitest';

import { CryptoSearchComponent } from './crypto-search.component';
import * as CryptoActions from '../../../store/crypto.actions';

describe('CryptoSearchComponent', () => {
  let component: CryptoSearchComponent;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoSearchComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideBrowserGlobalErrorListeners(),
        provideStore(),
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(CryptoSearchComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch updateSearch action when update is called', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.update('bitcoin');
    expect(dispatchSpy).toHaveBeenCalledWith(CryptoActions.updateSearch({ search: 'bitcoin' }));
  });

  it('should dispatch clearSearch action when clear is called', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.clear();
    expect(dispatchSpy).toHaveBeenCalledWith(CryptoActions.clearSearch());
  });
});
