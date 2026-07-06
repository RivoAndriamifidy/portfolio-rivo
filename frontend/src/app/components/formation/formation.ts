import { Component, inject, OnInit, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
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
  languages = signal<{ id: number; name: string; level: string; order: number }[]>([]);
  availabilityItems = signal<string[]>([]);
  bio = signal<string | null>(null);
  address = signal<string | null>(null);
  loading = signal(true);

  ngOnInit() {
    forkJoin({
      formations: this.portfolioService.getFormations(),
      languages: this.portfolioService.getLanguages(),
      profile: this.portfolioService.getProfile(),
    }).subscribe({
      next: ({ formations, languages, profile }) => {
        this.formations.set(formations);
        this.languages.set(languages);
        this.availabilityItems.set(profile.availabilityItems ?? []);
        this.bio.set(profile.bio);
        this.address.set(profile.address);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}