import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { Stat } from '../../models/portfolio.models';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-stats',
  imports: [],
  templateUrl: './stats.html',
  styleUrl: './stats.css',
})
export class Stats implements OnInit, AfterViewInit {
  private readonly portfolioService = inject(PortfolioService);
  private readonly platformId = inject(PLATFORM_ID);

  stats = signal<Stat[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.portfolioService.getStats().subscribe({
      next: (stats) => {
        this.stats.set(stats);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    setTimeout(() => this.animateCounters(), 400);
  }

  private animateCounters() {
    document.querySelectorAll('.stat-num').forEach((el) => {
      const target = el.getAttribute('data-value') ?? '';
      const suffix = target.replace(/[0-9]/g, '');
      const num = parseInt(target, 10);

      if (Number.isNaN(num)) {
        el.textContent = target;
        return;
      }

      let current = 0;
      const step = Math.ceil(num / 80);
      const timer = setInterval(() => {
        current = Math.min(current + step, num);
        el.textContent = `${current}${suffix}`;
        if (current >= num) clearInterval(timer);
      }, 16);
    });
  }
}