import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  computed,
  HostListener,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { LucideAngularModule, ListFilterIcon, RotateCcwIcon, XIcon } from 'lucide-angular';

import * as CryptoActions from '../../../store/crypto.actions';
import { selectMaxMarketCap } from '../../../store/crypto.selectors';

@Component({
  selector: 'app-crypto-filters',
  templateUrl: './crypto-filters.component.html',
  styleUrl: './crypto-filters.component.scss',
  imports: [LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CryptoFiltersComponent {
  private readonly store = inject(Store);

  readonly isOpen = signal(false);
  readonly name = signal('');
  readonly symbol = signal('');
  readonly minMarketCap = signal<number | null>(null);
  readonly maxMarketCapFilter = signal<number | null>(null);
  readonly minPriceChange = signal<number | null>(null);
  readonly maxPriceChange = signal<number | null>(null);

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
  readonly rotateCcwIcon = RotateCcwIcon;
  readonly xIcon = XIcon;

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

  updateMinPriceChange(value: number | null): void {
    this.minPriceChange.set(value);
    this.store.dispatch(CryptoActions.updateFilters({ filters: { minPriceChange: value } }));
  }

  updateMaxPriceChange(value: number | null): void {
    this.maxPriceChange.set(value);
    this.store.dispatch(CryptoActions.updateFilters({ filters: { maxPriceChange: value } }));
  }

  private isValidNumber(value: number | null): value is number {
    return value !== null && !isNaN(value) && isFinite(value);
  }

  onMinPriceChangeInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value === '' ? null : target.valueAsNumber;
    const maxValue = this.maxPriceChange();

    if (value === null) {
      this.updateMinPriceChange(null);
      return;
    }

    if (!this.isValidNumber(value)) {
      return;
    }

    if (value > (maxValue ?? Infinity)) {
      this.updateMaxPriceChange(value);
    }
    this.updateMinPriceChange(value);
  }

  onMaxPriceChangeInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value === '' ? null : target.valueAsNumber;
    const minValue = this.minPriceChange();

    if (value === null) {
      this.updateMaxPriceChange(null);
      return;
    }

    if (!this.isValidNumber(value)) {
      return;
    }

    if (value < (minValue ?? -Infinity)) {
      this.updateMinPriceChange(value);
    }
    this.updateMaxPriceChange(value);
  }

  onMinSliderChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.valueAsNumber;
    if (!this.isValidNumber(value)) {
      return;
    }
    const maxValue = this.maxMarketCapFilter() ?? this.maxMarketCap();
    // Ensure min doesn't exceed max
    if (value > maxValue) {
      this.updateMaxMarketCap(value);
      this.updateMarketCap(maxValue);
    } else {
      this.updateMarketCap(value);
    }
  }

  onMaxSliderChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.valueAsNumber;
    if (!this.isValidNumber(value)) {
      return;
    }
    const minValue = this.minMarketCap() ?? 0;
    // Ensure max doesn't go below min
    if (value < minValue) {
      this.updateMarketCap(value);
      this.updateMaxMarketCap(minValue);
    } else {
      this.updateMaxMarketCap(value);
    }
  }

  onMinInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value === '' ? null : target.valueAsNumber;
    const currentMaxFilter = this.maxMarketCapFilter();
    const absoluteMax = this.maxMarketCap();

    if (value === null) {
      this.updateMarketCap(null);
      return;
    }

    if (!this.isValidNumber(value)) {
      return;
    }

    if (value < 0) {
      this.updateMarketCap(0);
      return;
    }

    // Clamp to absolute max
    const clampedToMax = Math.min(value, absoluteMax);
    const finalValue = clampedToMax;

    // If final value exceeds current max filter, adjust max filter up to maintain valid state
    if (currentMaxFilter !== null && finalValue > currentMaxFilter) {
      this.updateMaxMarketCap(finalValue);
    }
    this.updateMarketCap(finalValue);
  }

  onMaxInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value === '' ? null : target.valueAsNumber;
    const minValue = this.minMarketCap();
    const absoluteMax = this.maxMarketCap();

    if (value === null) {
      this.updateMaxMarketCap(null);
      return;
    }

    if (!this.isValidNumber(value)) {
      return;
    }

    // Clamp to 0 minimum
    const clampedToZero = Math.max(value, 0);
    // Clamp to absolute max
    const clampedToMax = Math.min(clampedToZero, absoluteMax);
    const finalValue = clampedToMax;

    // If final value is less than current min, adjust min down
    if (minValue !== null && finalValue < minValue) {
      this.updateMarketCap(finalValue);
    }
    this.updateMaxMarketCap(finalValue);
  }

  reset(): void {
    this.name.set('');
    this.symbol.set('');
    this.minMarketCap.set(null);
    this.maxMarketCapFilter.set(null);
    this.minPriceChange.set(null);
    this.maxPriceChange.set(null);
    this.store.dispatch(CryptoActions.resetFilters());
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
