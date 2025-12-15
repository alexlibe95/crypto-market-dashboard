import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideStore } from '@ngrx/store';

import { CryptoTabViewComponent } from './crypto-tab-view.component';

describe('CryptoTabViewComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoTabViewComponent],
      providers: [  
        provideZonelessChangeDetection(),
        provideBrowserGlobalErrorListeners(),
        provideStore(),
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(CryptoTabViewComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
