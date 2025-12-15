# Crypto Market Dashboard

A modern, responsive dashboard for exploring cryptocurrency market data. View real-time market information in a clean table format or visualize market capitalization trends through interactive charts.

🌐 **Live Demo**: [https://crypto-market-dashboard.netlify.app/](https://crypto-market-dashboard.netlify.app/)

## Features

- **Data Table**: Browse cryptocurrencies with sorting, filtering, search, and pagination
- **Interactive Charts**: Visualize top cryptocurrencies by market cap using bar or pie charts
- **Advanced Filtering**: Filter by name, symbol, market cap range, and price change percentage
- **Real-time Search**: Quickly find cryptocurrencies by name, symbol, or ID
- **Responsive Design**: Optimized for desktop and mobile devices

## Tech Stack

- **Angular 20** with standalone components
- **NgRx** for state management
- **ECharts** for data visualization
- **Tailwind CSS** for styling
- **TypeScript** for type safety

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v11.6.2 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/alexlibe95/crypto-market-dashboard.git
cd crypto-market-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200`

## Available Scripts

- `npm start` - Start the development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

```
src/
├── app/
│   ├── features/
│   │   └── crypto/
│   │       ├── components/     # UI components
│   │       └── store/         # NgRx state management
│   └── core/
│       ├── models/            # TypeScript interfaces
│       ├── services/          # API services
│       └── constants/         # App constants
```

## Data Source

Market data is fetched from the CoinGecko API, providing real-time cryptocurrency information including prices, market capitalization, and 24-hour price changes.
