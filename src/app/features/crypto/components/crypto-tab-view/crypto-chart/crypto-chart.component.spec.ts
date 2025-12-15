import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideStore } from '@ngrx/store';

import { CryptoChartComponent } from './crypto-chart.component';

describe('CryptoChartComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoChartComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideBrowserGlobalErrorListeners(),
        provideStore(),
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(CryptoChartComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
