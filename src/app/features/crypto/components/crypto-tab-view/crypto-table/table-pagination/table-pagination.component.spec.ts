import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { Store } from '@ngrx/store';
import { vi } from 'vitest';

import { TablePaginationComponent } from './table-pagination.component';
import * as CryptoActions from '../../../../store/crypto.actions';
import { cryptoReducer, cryptoFeatureKey } from '../../../../store/crypto.reducer';

describe('TablePaginationComponent', () => {
  let component: TablePaginationComponent;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablePaginationComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideBrowserGlobalErrorListeners(),
        provideStore({
          [cryptoFeatureKey]: cryptoReducer,
        }),
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(TablePaginationComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default page size options', () => {
    expect(component.pageSizeOptions).toEqual([25, 50, 100, 250]);
  });

  it('should have setPageIndex method defined', () => {
    expect(component.setPageIndex).toBeDefined();
    expect(typeof component.setPageIndex).toBe('function');
  });

  it('should dispatch setPageSize action when setPageSize is called', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.setPageSize('50');
    expect(dispatchSpy).toHaveBeenCalledWith(CryptoActions.setPageSize({ pageSize: 50 }));
  });
});
