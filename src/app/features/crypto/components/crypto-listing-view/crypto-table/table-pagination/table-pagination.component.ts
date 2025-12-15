import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CryptoActions from '../../../../store/crypto.actions';
import { selectPagination, selectTotalResults } from '../../../../store/crypto.selectors';

@Component({
  selector: 'app-table-pagination',
  standalone: true,
  templateUrl: './table-pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablePaginationComponent {
  private store = inject(Store);
  readonly pagination = this.store.selectSignal(selectPagination);
  readonly total = this.store.selectSignal(selectTotalResults);
  readonly pageSizeOptions = [25, 50, 100];
  readonly pageSize = signal<number>(this.pageSizeOptions[0]);
  readonly pageIndex = signal<number>(0);
  readonly setPageIndex = (index: number) => {
    this.pageIndex.set(index);
    this.store.dispatch(CryptoActions.setPageIndex({ pageIndex: index }));
  }

  readonly setPageSize = (size: number) => {
    this.pageSize.set(this.pageSizeOptions.includes(size) ? size : this.pageSizeOptions[0]);
    this.pageIndex.set(0);
    this.store.dispatch(CryptoActions.setPageSize({ pageSize: size }));
  }
}
