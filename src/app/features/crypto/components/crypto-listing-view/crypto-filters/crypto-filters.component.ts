import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  computed,
  HostListener,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { LucideAngularModule, ListFilterIcon } from 'lucide-angular';

import * as CryptoActions from '../../../store/crypto.actions';
import { selectMaxMarketCap } from '../../../store/crypto.selectors';

@Component({
  selector: 'app-crypto-filters',
  templateUrl: './crypto-filters.component.html',
  styleUrl: './crypto-filters.component.scss',
  imports: [LucideAngularModule, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CryptoFiltersComponent {
  private readonly store = inject(Store);

  readonly isOpen = signal(false);
  readonly name = signal('');
  readonly symbol = signal('');
  readonly minMarketCap = signal<number | null>(null);
  readonly maxMarketCapFilter = signal<number | null>(null);

  readonly maxMarketCap = this.store.selectSignal(selectMaxMarketCap);
  readonly minSliderValue = computed(() => this.minMarketCap() ?? 0);
  readonly maxSliderValue = computed(() => {
    const max = this.maxMarketCapFilter();
    return max !== null ? max : this.maxMarketCap();
  });
  readonly minDisplayValue = computed(() => {
    const value = this.minMarketCap();
    return value !== null ? value : 0;
  });
  readonly maxDisplayValue = computed(() => {
    const value = this.maxMarketCapFilter();
    return value !== null ? value : this.maxMarketCap();
  });
  readonly rangePercentage = computed(() => {
    const max = this.maxMarketCap();
    if (max === 0) return { min: 0, max: 100 };
    const minPercent = (this.minSliderValue() / max) * 100;
    const maxPercent = (this.maxSliderValue() / max) * 100;
    return { min: minPercent, max: maxPercent };
  });

  readonly listFilterIcon = ListFilterIcon;

  togglePopover(): void {
    this.isOpen.update((value) => !value);
  }

  closePopover(): void {
    this.isOpen.set(false);
  }

  updateName(value: string): void {
    this.name.set(value);
    this.store.dispatch(CryptoActions.updateFilters({ filters: { name: value } }));
  }

  updateSymbol(value: string): void {
    this.symbol.set(value);
    this.store.dispatch(CryptoActions.updateFilters({ filters: { symbol: value } }));
  }

  updateMarketCap(value: number | null): void {
    this.minMarketCap.set(value);
    this.store.dispatch(CryptoActions.updateFilters({ filters: { minMarketCap: value } }));
  }

  updateMaxMarketCap(value: number | null): void {
    this.maxMarketCapFilter.set(value);
    this.store.dispatch(CryptoActions.updateFilters({ filters: { maxMarketCap: value } }));
  }

  onMinSliderChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.valueAsNumber;
    const maxValue = this.maxMarketCapFilter();
    // Ensure min doesn't exceed max
    if (maxValue !== null && value > maxValue) {
      this.updateMaxMarketCap(value);
    }
    this.updateMarketCap(value || null);
  }

  onMaxSliderChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.valueAsNumber;
    const minValue = this.minMarketCap();
    // Ensure max doesn't go below min
    if (minValue !== null && value < minValue) {
      this.updateMarketCap(value);
    }
    this.updateMaxMarketCap(value || null);
  }

  reset(): void {
    this.name.set('');
    this.symbol.set('');
    this.minMarketCap.set(null);
    this.maxMarketCapFilter.set(null);
    this.store.dispatch(CryptoActions.resetFilters());
    this.closePopover();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const popoverElement = target.closest('.popover-dropdown');
    const buttonElement = target.closest('.filter-button');

    if (!popoverElement && !buttonElement && this.isOpen()) {
      this.closePopover();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isOpen()) {
      this.closePopover();
    }
  }
}
