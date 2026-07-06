import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
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
    document.body.style.overflow = '';
    this.routerSub?.unsubscribe();
  }

  toggleMenu() {
    this.menuOpen.update((open) => !open);
    this.syncBodyScroll();
  }

  closeMenu() {
    this.menuOpen.set(false);
    this.syncBodyScroll();
  }

  isHomeSection(section: string): boolean {
    return this.isOnHome() && this.activeSection() === section;
  }

  goHome(event: MouseEvent) {
    if (!this.isOnHome()) {
      this.closeMenu();
      return;
    }

    event.preventDefault();
    this.closeMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    history.replaceState(null, '', '/');
    this.activeSection.set('');
  }

  navigateSection(section: string, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    const wasOpen = this.menuOpen();
    this.closeMenu();

    const navigate = () => {
      if (this.isOnHome()) {
        this.scrollToSection(section);
        return;
      }

      void this.router.navigate(['/'], { fragment: section });
    };

    if (wasOpen && this.isMobileViewport()) {
      window.setTimeout(navigate, 120);
      return;
    }

    navigate();
  }

  private scrollToSection(section: string) {
    const target = document.getElementById(section);
    if (!target) return;

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    history.replaceState(null, '', `#${section}`);
    this.activeSection.set(section);
  }

  private isMobileViewport(): boolean {
    return window.matchMedia('(max-width: 900px)').matches;
  }

  private syncBodyScroll() {
    document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
  }

  private isOnHome(): boolean {
    const path = this.router.url.split('?')[0].split('#')[0];
    return path === '/' || path === '';
  }

  private readonly onScroll = () => {
    this.isScrolled.set(window.scrollY > 24);
    this.updateActiveSection();
  };

  private updateActiveSection() {
    if (!this.isOnHome()) {
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