import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  HostListener,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { LucideAngularModule, ListFilterIcon } from 'lucide-angular';

import * as CryptoActions from '../../../store/crypto.actions';

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

  reset(): void {
    this.name.set('');
    this.symbol.set('');
    this.minMarketCap.set(null);
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
