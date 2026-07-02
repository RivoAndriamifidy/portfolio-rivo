import { Component, inject, OnInit, signal } from '@angular/core';
import { Service } from '../../models/portfolio.models';
import { PortfolioService } from '../../services/portfolio.service';

const SERVICE_ICONS: Record<string, string> = {
  server: '⚙️',
  layout: '🎨',
  brain: '🤖',
  compass: '🧭',
};

@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services implements OnInit {
  private readonly portfolioService = inject(PortfolioService);

  services = signal<Service[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.portfolioService.getServices().subscribe({
      next: (services) => {
        this.services.set(services);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  iconFor(service: Service): string {
    return SERVICE_ICONS[service.icon ?? ''] ?? '✦';
  }

  colorClass(index: number): string {
    return `c${(index % 4) + 1}`;
  }
}