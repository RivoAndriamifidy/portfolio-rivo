import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../models/portfolio.models';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-projects',
  imports: [RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {
  private readonly portfolioService = inject(PortfolioService);

  limit = input<number | null>(null);
  showAllLink = input(false);
  standalone = input(false);
  sectionTitle = input('Réalisations récentes');
  sectionLabel = input('Projets');

  projects = signal<Project[]>([]);
  loading = signal(true);

  displayedProjects = computed(() => {
    const all = this.projects();
    const max = this.limit();
    return max ? all.slice(0, max) : all;
  });

  hasMoreProjects = computed(() => {
    const max = this.limit();
    return max != null && this.projects().length > max;
  });

  ngOnInit() {
    this.portfolioService.getProjects().subscribe({
      next: (projects) => {
        this.projects.set(projects);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  hasPreview(project: Project): boolean {
    return Boolean(project.imageUrl || project.demoUrl);
  }

  previewSrc(project: Project): string {
    if (project.imageUrl) return project.imageUrl;
    if (project.demoUrl) {
      return `https://image.thum.io/get/width/1200/crop/675/noanimate/${project.demoUrl}`;
    }
    return '';
  }

  previewHost(project: Project): string {
    if (!project.demoUrl) return 'portfolio-rivo.dev';
    try {
      return new URL(project.demoUrl).hostname;
    } catch {
      return project.demoUrl;
    }
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