import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { DecimalPipe } from '@angular/common';

import { FormattedPriceComponent } from './formatted-price.component';

describe('FormattedPriceComponent', () => {
  let component: FormattedPriceComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormattedPriceComponent, DecimalPipe],
      providers: [
        provideZonelessChangeDetection(),
        provideBrowserGlobalErrorListeners(),
        provideStore(),
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(FormattedPriceComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have value input defined', () => {
    expect(component.value).toBeDefined();
  });
});
