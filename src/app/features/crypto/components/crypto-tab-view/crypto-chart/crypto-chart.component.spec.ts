import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideStore } from '@ngrx/store';

import { CryptoChartComponent } from './crypto-chart.component';

describe('CryptoChartComponent', () => {
  let component: CryptoChartComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoChartComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideBrowserGlobalErrorListeners(),
        provideStore(),
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(CryptoChartComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with bar chart type', () => {
    expect(component.chartType()).toBe('bar');
  });

  it('should initialize with default crypto count of 20', () => {
    expect(component.cryptoCount()).toBe(20);
  });

  it('should change chart type when setChartType is called', () => {
    component.setChartType('pie');
    expect(component.chartType()).toBe('pie');
    component.setChartType('bar');
    expect(component.chartType()).toBe('bar');
  });

  it('should change crypto count when setCryptoCount is called', () => {
    component.setCryptoCount(10);
    expect(component.cryptoCount()).toBe(10);
  });

  it('should have count options available', () => {
    expect(component.countOptions).toEqual([5, 10, 20, 50]);
  });
});
