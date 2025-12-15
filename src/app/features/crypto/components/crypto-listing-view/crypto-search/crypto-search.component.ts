import {
    Component,
    ChangeDetectionStrategy,
    inject
  } from '@angular/core';
  import { Store } from '@ngrx/store';
  import { LucideAngularModule, XIcon, SearchIcon } from 'lucide-angular';

import * as CryptoActions from '../../../store/crypto.actions';
import { selectSearch } from '../../../store/crypto.selectors';
  
  @Component({
    selector: 'app-crypto-search',
    imports: [LucideAngularModule],
    templateUrl: './crypto-search.component.html',
    styleUrl: './crypto-search.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class CryptoSearchComponent {
    private store = inject(Store);
  
    readonly searchValue = this.store.selectSignal(selectSearch);
    readonly xIcon = XIcon;
    readonly searchIcon = SearchIcon;
  
    update(value: string): void {
      this.store.dispatch(
        CryptoActions.updateSearch({ search: value })
      );
    }
  
    clear(): void {
      this.store.dispatch(CryptoActions.clearSearch());
    }
  }
  