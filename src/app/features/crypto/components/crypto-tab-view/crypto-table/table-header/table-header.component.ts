import {
  Component,
  ChangeDetectionStrategy,
  input,
  HostListener,
  HostBinding,
} from '@angular/core';
import { LucideAngularModule, ArrowUpIcon, ArrowDownIcon } from 'lucide-angular';

import { CryptoCurrency } from '../../../../../../core/models/crypto.model';

@Component({
  // Attribute selector required to preserve table DOM structure (th must be direct child of tr)
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'th[app-table-header]',
  imports: [LucideAngularModule],
  templateUrl: './table-header.component.html',
  styleUrl: './table-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHeaderComponent {
  readonly columnKey = input.required<keyof CryptoCurrency>();
  readonly label = input.required<string>();
  readonly align = input.required<'left' | 'right'>();
  readonly additionalClasses = input<string>('');
  readonly sortable = input<boolean>(true);
  readonly isSortedBy = input<boolean>(false);
  readonly sortDirection = input<'asc' | 'desc' | null>(null);
  readonly onSort = input.required<(column: keyof CryptoCurrency) => void>();

  readonly arrowUpIcon = ArrowUpIcon;
  readonly arrowDownIcon = ArrowDownIcon;

  @HostListener('click')
  handleClick(): void {
    if (this.sortable()) {
      this.onSort()(this.columnKey());
    }
  }

  @HostBinding('class')
  get headerClasses(): string {
    const baseClasses = 'px-4 py-2 cursor-pointer hover:bg-white/10 transition-colors';
    const alignClass = this.align() === 'left' ? 'text-left' : 'text-right';
    const additionalClasses = this.additionalClasses() || '';

    return `${baseClasses} ${alignClass} ${additionalClasses}`.trim();
  }
}
