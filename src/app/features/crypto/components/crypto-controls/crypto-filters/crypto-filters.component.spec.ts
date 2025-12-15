import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideStore } from '@ngrx/store';

import { CryptoFiltersComponent } from './crypto-filters.component';

describe('CryptoFiltersComponent', () => {
  let component: CryptoFiltersComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoFiltersComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideBrowserGlobalErrorListeners(),
        provideStore(),
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(CryptoFiltersComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle popover open state', () => {
    expect(component.isOpen()).toBe(false);
    component.togglePopover();
    expect(component.isOpen()).toBe(true);
    component.togglePopover();
    expect(component.isOpen()).toBe(false);
  });

  it('should close popover when closePopover is called', () => {
    component.togglePopover();
    expect(component.isOpen()).toBe(true);
    component.closePopover();
    expect(component.isOpen()).toBe(false);
  });
});
