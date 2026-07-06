import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  protected readonly title = signal('portfolio-rivo');

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initLoader();
    this.initCursor();
    this.initScrollProgress();
    this.initParticles();
    this.initScrollReveal();
    this.initCardTilt();
    this.initMagneticButtons();
    this.initRipple();
    this.initGlitch();
    this.initHeroGrid();
    this.initParallaxBlobs();
    this.initFloatingShapes();
    this.initNavHighlight();
    this.initBadgeShimmer();
  }

  private initLoader() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.getElementById('loader')?.classList.add('done');
        setTimeout(() => document.getElementById('loader')?.remove(), 700);
      }, 900);
    });
  }

  private initCursor() {
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    if (!cursor || !ring) return;

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
    });

    const animCursor = () => {
      cursor.style.left = `${mx}px`;
      cursor.style.top = `${my}px`;
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      requestAnimationFrame(animCursor);
    };
    animCursor();
  }

  private initScrollProgress() {
    const bar = document.getElementById('progress-bar');
    if (!bar) return;

    window.addEventListener('scroll', () => {
      const pct =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
        100;
      bar.style.width = `${pct}%`;
    });
  }

  private initParticles() {
    const canvas = document.getElementById('particles') as HTMLCanvasElement | null;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0;
    let H = 0;
    const pts: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      c: string;
      o: number;
    }[] = [];

    const resizeCanvas = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const colors = ['rgba(124,92,252,', 'rgba(255,77,141,', 'rgba(0,229,255,'];
    for (let i = 0; i < 55; i++) {
      pts.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.5 + 0.5,
        c: colors[Math.floor(Math.random() * colors.length)],
        o: Math.random() * 0.4 + 0.1,
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.c}${p.o})`;
        ctx.fill();
      });

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(124,92,252,${0.1 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(drawParticles);
    };
    drawParticles();
  }

  private initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const revObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 90);
            revObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    reveals.forEach((el) => revObs.observe(el));

    document.querySelectorAll('.sec-title').forEach((el) => {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              el.classList.add('visible-title');
              obs.unobserve(el);
            }
          });
        },
        { threshold: 0.5 },
      );
      obs.observe(el);
    });
  }

  private initCardTilt() {
    document
      .querySelectorAll('.service-card, .project-card, .stack-group, .lang-card')
      .forEach((card) => {
        const el = card as HTMLElement;
        el.addEventListener('mousemove', (e) => {
          const r = el.getBoundingClientRect();
          const x = ((e as MouseEvent).clientX - r.left) / r.width - 0.5;
          const y = ((e as MouseEvent).clientY - r.top) / r.height - 0.5;
          el.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
          el.style.setProperty(
            '--mx',
            `${(((e as MouseEvent).clientX - r.left) / r.width) * 100}%`,
          );
          el.style.setProperty(
            '--my',
            `${(((e as MouseEvent).clientY - r.top) / r.height) * 100}%`,
          );
        });
        el.addEventListener('mouseleave', () => {
          el.style.transform = '';
        });
      });
  }

  private initMagneticButtons() {
    document.querySelectorAll('.btn-glow, .btn-outline, .nav-cta').forEach((btn) => {
      const el = btn as HTMLElement;
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = ((e as MouseEvent).clientX - r.left - r.width / 2) * 0.25;
        const y = ((e as MouseEvent).clientY - r.top - r.height / 2) * 0.25;
        el.style.transform = `translate(${x}px,${y}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  private initRipple() {
    document.querySelectorAll('.contact-link, .btn-glow, .btn-outline').forEach((el) => {
      const host = el as HTMLElement;
      host.classList.add('ripple-host');
      host.addEventListener('click', (e) => {
        const r = host.getBoundingClientRect();
        const circle = document.createElement('span');
        circle.style.cssText = `position:absolute;border-radius:50%;width:60px;height:60px;background:rgba(255,255,255,0.15);left:${(e as MouseEvent).clientX - r.left - 30}px;top:${(e as MouseEvent).clientY - r.top - 30}px;animation:rippleAnim 0.6s linear forwards;pointer-events:none;`;
        host.appendChild(circle);
        setTimeout(() => circle.remove(), 600);
      });
    });
  }

  private initGlitch() {
    const h1 = document.querySelector('.hero h1 .name-main');
    if (h1) {
      h1.classList.add('glitch-wrap');
      h1.setAttribute('data-text', h1.textContent ?? '');
    }
  }

  private initHeroGrid() {
    const heroEl = document.querySelector('.hero');
    if (!heroEl) return;
    const grid = document.createElement('div');
    grid.className = 'hero-grid';
    heroEl.insertBefore(grid, heroEl.firstChild);
  }

  private initParallaxBlobs() {
    const blob1 = document.querySelector('.blob-1') as HTMLElement | null;
    const blob2 = document.querySelector('.blob-2') as HTMLElement | null;
    const blob3 = document.querySelector('.blob-3') as HTMLElement | null;

    window.addEventListener(
      'scroll',
      () => {
        const s = window.scrollY;
        if (blob1) blob1.style.transform = `translate(${s * 0.03}px,${s * 0.05}px) scale(1)`;
        if (blob2) blob2.style.transform = `translate(${-s * 0.02}px,${-s * 0.04}px) scale(1)`;
        if (blob3) {
          blob3.style.transform = `translate(-50%,calc(-50% + ${s * 0.03}px)) scale(1)`;
        }
      },
      { passive: true },
    );
  }

  private initFloatingShapes() {
    const heroEl = document.querySelector('.hero');
    if (!heroEl) return;

    (
      [
        [120, 'var(--accent1)', 0, '3s'],
        [80, 'var(--accent2)', 2, '5s'],
        [60, 'var(--accent3)', 4, '4s'],
      ] as const
    ).forEach(([sz, c, d, dur]) => {
      const shape = document.createElement('div');
      shape.className = 'float-shape';
      shape.style.cssText = `width:${sz}px;height:${sz}px;background:${c};top:${15 + Math.random() * 60}%;left:${5 + Math.random() * 85}%;animation-delay:${d}s;animation-duration:${dur};border-radius:${Math.random() > 0.5 ? '50%' : '20%'}`;
      heroEl.appendChild(shape);
    });
  }

  private initNavHighlight() {
    const sections = document.querySelectorAll('section[id], div[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener(
      'scroll',
      () => {
        let current = '';
        sections.forEach((s) => {
          if (window.scrollY >= (s as HTMLElement).offsetTop - 100) {
            current = s.id;
          }
        });
        navLinks.forEach((a) => {
          const link = a as HTMLElement;
          link.style.color =
            link.getAttribute('href') === `#${current}` ? 'var(--text)' : '';
        });
      },
      { passive: true },
    );
  }

  private initBadgeShimmer() {
    const heroBadge = document.querySelector('.hero-badge') as HTMLElement | null;
    if (!heroBadge) return;

    setInterval(() => {
      heroBadge.style.boxShadow = '0 0 20px rgba(124,92,252,0.45)';
      setTimeout(() => {
        heroBadge.style.boxShadow = '';
      }, 600);
    }, 3000);
  }
}