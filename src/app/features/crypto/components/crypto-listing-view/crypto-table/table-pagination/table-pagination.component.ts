import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  LucideAngularModule,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-angular';
import * as CryptoActions from '../../../../store/crypto.actions';
import { selectPagination, selectTotalResults } from '../../../../store/crypto.selectors';

@Component({
  selector: 'app-table-pagination',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './table-pagination.component.html',
  styleUrl: './table-pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablePaginationComponent {
  private store = inject(Store);
  readonly pagination = this.store.selectSignal(selectPagination);
  readonly total = this.store.selectSignal(selectTotalResults);
  readonly pageSizeOptions = [25, 50, 100, 250];

  readonly chevronLeftIcon = ChevronLeftIcon;
  readonly chevronLeftIcons = ChevronsLeftIcon;
  readonly chevronRightIcon = ChevronRightIcon;
  readonly chevronRightIcons = ChevronsRightIcon;

  readonly totalPages = computed(() => {
    const pageSize = this.pagination().pageSize;
    return Math.ceil(this.total() / pageSize);
  });

  readonly hasPreviousPage = computed(() => this.pagination().pageIndex > 0);
  readonly hasNextPage = computed(() => {
    const { pageIndex, pageSize } = this.pagination();
    return (pageIndex + 1) * pageSize < this.total();
  });

  readonly visiblePages = computed(() => {
    const currentPage = this.pagination().pageIndex;
    const total = this.totalPages();
    const pages: number[] = [];

    // Show up to 5 page numbers
    let start = Math.max(0, currentPage - 2);
    const end = Math.min(total - 1, start + 4);

    // Adjust start if we're near the end
    if (end - start < 4) {
      start = Math.max(0, end - 4);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  });

  readonly displayRange = computed(() => {
    const { pageIndex, pageSize } = this.pagination();
    const total = this.total();

    if (total === 0) {
      return { start: 0, end: 0 };
    }

    // Ensure pageIndex is within valid bounds
    const maxPageIndex = Math.max(0, Math.ceil(total / pageSize) - 1);
    const validPageIndex = Math.min(pageIndex, maxPageIndex);

    const start = validPageIndex * pageSize + 1;
    const end = Math.min((validPageIndex + 1) * pageSize, total);

    // Additional safety check: ensure start doesn't exceed end
    if (start > end) {
      return { start: 0, end: 0 };
    }

    return { start, end };
  });

  setPageIndex(index: number): void {
    const totalPages = this.totalPages();
    // Clamp index to valid range [0, totalPages - 1]
    const clampedIndex = Math.max(0, Math.min(index, Math.max(0, totalPages - 1)));
    if (clampedIndex >= 0 && clampedIndex < totalPages) {
      this.store.dispatch(CryptoActions.setPageIndex({ pageIndex: clampedIndex }));
    }
  }

  setPageSize(size: number | string): void {
    const pageSize = typeof size === 'string' ? parseInt(size, 10) : size;
    if (this.pageSizeOptions.includes(pageSize)) {
      this.store.dispatch(CryptoActions.setPageSize({ pageSize }));
    }
  }

  goToFirstPage(): void {
    this.setPageIndex(0);
  }

  goToLastPage(): void {
    this.setPageIndex(this.totalPages() - 1);
  }

  goToPreviousPage(): void {
    if (this.hasPreviousPage()) {
      this.setPageIndex(this.pagination().pageIndex - 1);
    }
  }

  goToNextPage(): void {
    if (this.hasNextPage()) {
      this.setPageIndex(this.pagination().pageIndex + 1);
    }
  }
}
