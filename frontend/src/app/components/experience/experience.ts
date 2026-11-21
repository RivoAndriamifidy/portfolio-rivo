import { Component, inject, OnInit, signal } from '@angular/core';
import { Experience as ExperienceItem } from '../../models/portfolio.models';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-experience',
  imports: [],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience implements OnInit {
  private readonly portfolioService = inject(PortfolioService);

  experiences = signal<ExperienceItem[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.portfolioService.getExperiences().subscribe({
      next: (experiences) => {
        this.experiences.set(experiences);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
