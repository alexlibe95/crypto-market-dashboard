import type { ThemeOption } from 'ngx-echarts';

export const CryptoTheme: ThemeOption = {
  color: [
    '#3b82f6', // Blue
    '#8b5cf6', // Purple
    '#ec4899', // Pink
    '#10b981', // Green
    '#f59e0b', // Amber
    '#ef4444', // Red
    '#06b6d4', // Cyan
    '#6366f1', // Indigo
    '#14b8a6', // Teal
    '#f97316', // Orange
  ],

  title: {
    fontWeight: 'normal',
    color: '#ffffff',
    textStyle: {
      color: '#ffffff',
    },
  },

  visualMap: {
    color: ['#3b82f6', '#8b5cf6'],
  },

  toolbox: {
    color: ['#3b82f6', '#3b82f6', '#3b82f6', '#3b82f6'],
  },

  tooltip: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    textStyle: {
      color: '#ffffff',
    },
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: '#3b82f6',
        type: 'solid',
      },
      crossStyle: {
        color: '#3b82f6',
      },
      shadowStyle: {
        color: 'rgba(59, 130, 246, 0.3)',
      },
    },
  },

  dataZoom: {
    dataBackgroundColor: 'rgba(255, 255, 255, 0.1)',
    fillerColor: 'rgba(59, 130, 246, 0.2)',
    handleColor: '#3b82f6',
  },

  timeline: {
    lineStyle: {
      color: '#3b82f6',
    },
    controlStyle: {
      color: '#3b82f6',
      borderColor: '#3b82f6',
    },
  },

  candlestick: {
    itemStyle: {
      color: '#3b82f6',
      color0: '#8b5cf6',
    },
    lineStyle: {
      width: 1,
      color: '#3b82f6',
      color0: '#8b5cf6',
    },
    areaStyle: {
      color: '#3b82f6',
      color0: '#1e40af',
    },
  },

  graph: {
    itemStyle: {
      color: '#3b82f6',
    },
    linkStyle: {
      color: '#6366f1',
    },
  },

  map: {
    itemStyle: {
      color: '#3b82f6',
    },
    areaStyle: {
      color: 'rgba(255, 255, 255, 0.1)',
    },
    label: {
      color: '#ffffff',
    },
  },

  gauge: {
    axisLine: {
      lineStyle: {
        color: [
          [0.2, 'rgba(255, 255, 255, 0.2)'],
          [0.8, '#3b82f6'],
          [1, '#8b5cf6'],
        ],
        width: 8,
      },
    },
  },
};
