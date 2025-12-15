import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideStore } from '@ngrx/store';

import { TablePaginationComponent } from './table-pagination.component';

describe('TablePaginationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablePaginationComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideBrowserGlobalErrorListeners(),
        provideStore(),
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(TablePaginationComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
