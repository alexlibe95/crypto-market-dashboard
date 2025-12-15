import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

import { CryptoTableComponent } from './crypto-table/crypto-table.component';
import { CryptoChartComponent } from './crypto-chart/crypto-chart.component';

type TabType = 'list' | 'chart';

@Component({
  selector: 'app-crypto-tab-view',
  imports: [CryptoTableComponent, CryptoChartComponent],
  templateUrl: './crypto-tab-view.component.html',
  styleUrl: './crypto-tab-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CryptoTabViewComponent {
  readonly activeTab = signal<TabType>('list');

  setActiveTab(tab: TabType): void {
    this.activeTab.set(tab);
  }
}

