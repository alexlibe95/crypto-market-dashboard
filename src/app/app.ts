import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoinGeckoService } from './core/services/coingecko.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('crypto-market-dashboard');

  private coingeckoService = inject(CoinGeckoService);

  ngOnInit() {
    // Temporary smoke test for US-1 (will move to NgRx effect)
    this.coingeckoService.getMarketData().pipe(take(1)).subscribe((data) => {
      console.log('CoinGecko data:', data);
    });
  }
}
