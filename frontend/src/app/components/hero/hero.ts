import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Profile } from '../../models/portfolio.models';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements OnInit {
  private readonly portfolioService = inject(PortfolioService);

  profile = signal<Profile | null>(null);
  loading = signal(true);
  error = signal(false);

  pitch(bio: string): string {
    const sentences = bio.match(/[^.!?]+[.!?]+/g);
    if (!sentences?.length) return bio;
    return sentences.slice(0, 2).join(' ').trim();
  }

  ngOnInit() {
    this.portfolioService.getProfile().subscribe({
      next: (profile) => {
        this.profile.set(profile);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }
}