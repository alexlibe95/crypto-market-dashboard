import { Component, ChangeDetectionStrategy, inject, computed, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import type { EChartsCoreOption } from 'echarts/core';
import { NgxEchartsDirective, ThemeOption } from 'ngx-echarts';

import { selectSearchedCryptos } from '../../../store/crypto.selectors';
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

  readonly cryptos = this.store.selectSignal(selectSearchedCryptos);
  readonly theme: ThemeOption = CryptoTheme;

  readonly chartType = signal<ChartType>('bar');
  readonly cryptoCount = signal<number>(20);
  readonly countOptions = [5, 10, 20, 50];

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

    const titleText = `Top ${count} Cryptocurrencies by Market Cap`;

    if (type === 'pie') {
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
          trigger: 'item',
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
          orient: 'vertical',
          left: 'left',
          top: 'middle',
          textStyle: {
            color: '#ffffff',
          },
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['60%', '50%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 8,
              borderColor: 'rgba(0, 0, 0, 0.3)',
              borderWidth: 2,
            },
            label: {
              show: true,
              formatter: '{b}: {c}',
              color: '#ffffff',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 14,
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
