import { Component, inject, OnInit, signal } from '@angular/core';
import { Formation as FormationItem } from '../../models/portfolio.models';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-formation',
  imports: [],
  templateUrl: './formation.html',
  styleUrl: './formation.css',
})
export class Formation implements OnInit {
  private readonly portfolioService = inject(PortfolioService);

  formations = signal<FormationItem[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.portfolioService.getFormations().subscribe({
      next: (formations) => {
        this.formations.set(formations);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}