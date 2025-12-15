import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideStore } from '@ngrx/store';

import { CryptoTabViewComponent } from './crypto-tab-view.component';

describe('CryptoTabViewComponent', () => {
  let component: CryptoTabViewComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoTabViewComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideBrowserGlobalErrorListeners(),
        provideStore(),
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(CryptoTabViewComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with list tab active', () => {
    expect(component.activeTab()).toBe('list');
  });

  it('should change active tab when setActiveTab is called', () => {
    component.setActiveTab('chart');
    expect(component.activeTab()).toBe('chart');
    component.setActiveTab('list');
    expect(component.activeTab()).toBe('list');
  });
});
