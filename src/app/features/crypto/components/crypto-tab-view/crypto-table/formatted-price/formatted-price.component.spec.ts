import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { DecimalPipe } from '@angular/common';

import { FormattedPriceComponent } from './formatted-price.component';

describe('FormattedPriceComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormattedPriceComponent, DecimalPipe],
      providers: [
        provideZonelessChangeDetection(),
        provideBrowserGlobalErrorListeners(),
        provideStore(),
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(FormattedPriceComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
