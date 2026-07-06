import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '../../models/portfolio.models';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements OnInit, AfterViewInit, OnDestroy {
  private readonly portfolioService = inject(PortfolioService);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly host = inject(ElementRef<HTMLElement>);

  profile = signal<Profile | null>(null);
  loading = signal(true);
  error = signal(false);
  private floatingShapes: HTMLElement[] = [];

  pitch(bio: string): string {
    const sentences = bio.match(/[^.!?]+[.!?]+/g);
    if (!sentences?.length) return bio;
    return sentences.slice(0, 2).join(' ').trim();
  }

  goToSection(section: string, event: MouseEvent) {
    event.preventDefault();
    const path = this.router.url.split('?')[0].split('#')[0];

    if (path === '/' || path === '') {
      document.getElementById(section)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      history.replaceState(null, '', `#${section}`);
      return;
    }

    void this.router.navigate(['/'], { fragment: section });
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const heroEl = this.host.nativeElement.querySelector('.hero') as HTMLElement | null;
    if (!heroEl || heroEl.dataset['enhanced'] === 'true') return;
    heroEl.dataset['enhanced'] = 'true';

    const grid = document.createElement('div');
    grid.className = 'hero-grid';
    heroEl.insertBefore(grid, heroEl.firstChild);

    (
      [
        [120, 'var(--accent1)', 0, '3s'],
        [80, 'var(--accent2)', 2, '5s'],
        [60, 'var(--accent3)', 4, '4s'],
      ] as const
    ).forEach(([size, color, delay, duration]) => {
      const shape = document.createElement('div');
      shape.className = 'float-shape';
      shape.style.cssText = `width:${size}px;height:${size}px;background:${color};top:${15 + Math.random() * 60}%;left:${5 + Math.random() * 85}%;animation-delay:${delay}s;animation-duration:${duration};border-radius:${Math.random() > 0.5 ? '50%' : '20%'}`;
      heroEl.appendChild(shape);
      this.floatingShapes.push(shape);
    });
  }

  ngOnDestroy() {
    this.floatingShapes.forEach((shape) => shape.remove());
    this.floatingShapes = [];
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