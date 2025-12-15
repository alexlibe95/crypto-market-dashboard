import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
  signal,
  PLATFORM_ID,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { isPlatformBrowser } from '@angular/common';
import { fromEvent } from 'rxjs';
import type { EChartsCoreOption } from 'echarts/core';
import { NgxEchartsDirective, ThemeOption } from 'ngx-echarts';

import {
  selectSearchedCryptos,
  selectFilters,
  selectSearch,
} from '../../../store/crypto.selectors';
import { CryptoTheme } from './crypto-chart-theme';

type ChartType = 'bar' | 'pie';

@Component({
  selector: 'app-crypto-chart',
  standalone: true,
  templateUrl: './crypto-chart.component.html',
  styleUrl: './crypto-chart.component.scss',
  imports: [NgxEchartsDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CryptoChartComponent {
  private store = inject(Store);
  private platformId = inject(PLATFORM_ID);
  private destroyRef = inject(DestroyRef);

  readonly cryptos = this.store.selectSignal(selectSearchedCryptos);
  readonly filters = this.store.selectSignal(selectFilters);
  readonly search = this.store.selectSignal(selectSearch);
  readonly theme: ThemeOption = CryptoTheme;

  readonly chartType = signal<ChartType>('bar');
  readonly cryptoCount = signal<number>(20);
  readonly countOptions = [5, 10, 20, 50];
  readonly isMobile = signal<boolean>(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateMobileState();
      fromEvent(window, 'resize')
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.updateMobileState());
    }
  }

  private updateMobileState(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile.set(window.innerWidth < 768); // md breakpoint (matches Tailwind md: classes)
    }
  }

  /**
   * Formats large numbers with abbreviations (B, M, K)
   * @param value - The number to format
   * @returns Formatted string (e.g., "123B", "45M", "1.2K")
   */
  private formatMarketCap(value: number): string {
    if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(1)}B`;
    }
    if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(1)}M`;
    }
    if (value >= 1e3) {
      return `$${(value / 1e3).toFixed(1)}K`;
    }
    return `$${value.toFixed(0)}`;
  }

  readonly hasActiveFilters = computed(() => {
    const currentFilters = this.filters();
    const currentSearch = this.search();
    return (
      currentFilters.name.trim() !== '' ||
      currentFilters.symbol.trim() !== '' ||
      currentFilters.minMarketCap !== null ||
      currentFilters.maxMarketCap !== null ||
      currentFilters.minPriceChange !== null ||
      currentFilters.maxPriceChange !== null ||
      currentSearch.trim() !== ''
    );
  });

  readonly chartOptions = computed<EChartsCoreOption>(() => {
    const allCryptos = this.cryptos();
    const count = this.cryptoCount();
    const type = this.chartType();

    // Sort by market cap descending and take top N
    const sortedData = [...allCryptos]
      .sort((a, b) => (b.market_cap || 0) - (a.market_cap || 0))
      .slice(0, count)
      .filter((c) => c.market_cap != null && c.market_cap > 0);

    if (sortedData.length === 0) {
      return {
        title: {
          text: 'No data available',
          left: 'center',
          textStyle: { color: '#ffffff' },
        },
      };
    }

    const hasFilters = this.hasActiveFilters();
    const titleText = hasFilters
      ? `Top ${count} Crypto by Market Cap (Filtered)`
      : `Top ${count} Crypto by Market Cap`;

    if (type === 'pie') {
      const isMobileView = this.isMobile();

      return {
        grid: {
          left: isMobileView ? '5%' : '10%',
          right: isMobileView ? '5%' : '10%',
          top: isMobileView ? '15%' : '10%',
          bottom: isMobileView ? '25%' : '15%',
          containLabel: true,
        },
        title: {
          text: titleText,
          left: 'center',
          top: isMobileView ? 5 : 10,
          textStyle: {
            color: '#ffffff',
            fontSize: isMobileView ? 14 : 18,
            fontWeight: 'normal',
          },
        },
        tooltip: {
          trigger: 'item',
          confine: true, // Keep tooltip within chart area
          position: (point: number[], params: unknown, dom: HTMLElement) => {
            // Position tooltip to stay within viewport
            const [x, y] = point;
            const tooltipWidth = dom.offsetWidth || 200;
            const tooltipHeight = dom.offsetHeight || 100;
            const chartWidth = isPlatformBrowser(this.platformId) ? window.innerWidth : 400;
            const chartHeight = isPlatformBrowser(this.platformId) ? window.innerHeight : 600;

            let posX = x;
            let posY = y;

            // Adjust horizontal position
            if (x + tooltipWidth > chartWidth) {
              posX = chartWidth - tooltipWidth - 10;
            }
            if (posX < 10) {
              posX = 10;
            }

            // Adjust vertical position
            if (y + tooltipHeight > chartHeight) {
              posY = chartHeight - tooltipHeight - 10;
            }
            if (posY < 10) {
              posY = 10;
            }

            return [posX, posY];
          },
          formatter: (params: unknown) => {
            const echartsParam = params as {
              data: { name: string; value: number; raw: (typeof sortedData)[0] };
            };
            if (!echartsParam?.data) return '';
            const crypto = echartsParam.data.raw;
            if (!crypto) return '';

            return `
              <strong>${crypto.name} (${crypto.symbol.toUpperCase()})</strong><br/>
              Market Cap: $${(crypto.market_cap || 0).toLocaleString()}<br/>
              Price: $${(crypto.current_price || 0).toLocaleString()}<br/>
              24h Change: ${(crypto.price_change_percentage_24h || 0).toFixed(2)}%
            `;
          },
        },
        legend: {
          orient: 'horizontal',
          left: 'center',
          bottom: isMobileView ? 5 : 0,
          itemWidth: isMobileView ? 12 : 25,
          itemHeight: isMobileView ? 8 : 14,
          itemGap: isMobileView ? 5 : 10,
          textStyle: {
            color: '#ffffff',
            fontSize: isMobileView ? 10 : 12,
          },
        },
        series: [
          {
            type: 'pie',
            radius: isMobileView ? ['25%', '50%'] : ['40%', '70%'],
            center: ['50%', isMobileView ? '42%' : '45%'],
            avoidLabelOverlap: true,
            labelLine: {
              show: true,
              length: isMobileView ? 10 : 15,
              length2: isMobileView ? 5 : 10,
            },
            itemStyle: {
              borderRadius: 8,
              borderColor: 'rgba(0, 0, 0, 0.3)',
              borderWidth: 2,
            },
            label: {
              show: true,
              formatter: (params: unknown) => {
                const echartsParam = params as { name: string; value: number };
                if (!echartsParam) return '';
                return `${echartsParam.name}: ${this.formatMarketCap(echartsParam.value)}`;
              },
              color: '#ffffff',
              fontSize: isMobileView ? 9 : 12,
            },
            emphasis: {
              label: {
                show: true,
                fontSize: isMobileView ? 12 : 14,
                fontWeight: 'bold',
              },
            },
            data: sortedData.map((c) => ({
              value: c.market_cap || 0,
              name: c.symbol.toUpperCase(),
              raw: c,
            })),
          },
        ],
      };
    }

    // Bar chart configuration
    return {
      title: {
        text: titleText,
        left: 'center',
        top: 10,
        textStyle: {
          color: '#ffffff',
          fontSize: 18,
          fontWeight: 'normal',
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: (params: unknown) => {
          const echartsParams = params as {
            dataIndex: number;
            data: { raw: (typeof sortedData)[0] };
          }[];
          if (!echartsParams || echartsParams.length === 0) return '';
          const dataIndex = echartsParams[0]?.dataIndex;
          if (dataIndex === undefined) return '';
          const crypto = sortedData[dataIndex];
          if (!crypto) return '';

          return `
            <strong>${crypto.name} (${crypto.symbol.toUpperCase()})</strong><br/>
            Market Cap: $${(crypto.market_cap || 0).toLocaleString()}<br/>
            Price: $${(crypto.current_price || 0).toLocaleString()}<br/>
            24h Change: ${(crypto.price_change_percentage_24h || 0).toFixed(2)}%
          `;
        },
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '15%',
        top: '15%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: sortedData.map((c) => c.symbol.toUpperCase()),
        axisLabel: {
          rotate: 45,
          color: '#ffffff',
          fontSize: 12,
        },
        axisLine: {
          lineStyle: { color: 'rgba(255, 255, 255, 0.2)' },
        },
      },
      yAxis: {
        type: 'value',
        name: 'Market Cap',
        nameTextStyle: {
          color: '#ffffff',
        },
        axisLabel: {
          formatter: (v: number) => `$${(v / 1e9).toFixed(1)}B`,
          color: '#ffffff',
        },
        axisLine: {
          lineStyle: { color: 'rgba(255, 255, 255, 0.2)' },
        },
        splitLine: {
          lineStyle: { color: 'rgba(255, 255, 255, 0.1)' },
        },
      },
      series: [
        {
          type: 'bar',
          name: 'Market Cap',
          data: sortedData.map((c) => ({
            value: c.market_cap || 0,
            raw: c,
          })),
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#3b82f6' },
                { offset: 1, color: '#1e40af' },
              ],
            },
          },
          label: {
            show: false,
          },
          emphasis: {
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: '#60a5fa' },
                  { offset: 1, color: '#3b82f6' },
                ],
              },
            },
          },
        },
      ],
    };
  });

  setChartType(type: ChartType): void {
    this.chartType.set(type);
  }

  setCryptoCount(count: number): void {
    this.cryptoCount.set(count);
  }
}
