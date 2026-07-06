import { Component, inject, OnInit, signal } from '@angular/core';
import { Project } from '../../models/portfolio.models';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {
  private readonly portfolioService = inject(PortfolioService);

  projects = signal<Project[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.portfolioService.getProjects().subscribe({
      next: (projects) => {
        this.projects.set(projects);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  badgeClass(category: string): string {
    const map: Record<string, string> = {
      'Full Stack': 'badge b-full',
      'Back-End': 'badge b-back',
      'Front-End': 'badge b-front',
      IA: 'badge b-ia',
      Stage: 'badge b-stage',
    };
    return map[category] ?? 'badge b-full';
  }
}