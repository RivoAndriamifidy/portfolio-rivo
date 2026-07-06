import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private routerSub?: Subscription;

  isScrolled = signal(false);
  menuOpen = signal(false);
  activeSection = signal('');

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.onScroll();

    this.routerSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.menuOpen.set(false);
        this.updateActiveSection();
      });

    this.updateActiveSection();
  }

  ngOnDestroy() {
    if (!isPlatformBrowser(this.platformId)) return;
    window.removeEventListener('scroll', this.onScroll);
    this.routerSub?.unsubscribe();
  }

  toggleMenu() {
    this.menuOpen.update((open) => !open);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }

  isHomeSection(section: string): boolean {
    return this.router.url === '/' && this.activeSection() === section;
  }

  private readonly onScroll = () => {
    this.isScrolled.set(window.scrollY > 24);
    this.updateActiveSection();
  };

  private updateActiveSection() {
    if (this.router.url !== '/') {
      this.activeSection.set('');
      return;
    }

    const sections = document.querySelectorAll('section[id], #contact');
    let current = '';

    sections.forEach((section) => {
      const el = section as HTMLElement;
      if (window.scrollY >= el.offsetTop - 120) {
        current = el.id;
      }
    });

    this.activeSection.set(current);
  }
}