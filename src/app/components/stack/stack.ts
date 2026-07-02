import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { StackGroup, StackItem } from '../../models/portfolio.models';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-stack',
  imports: [],
  templateUrl: './stack.html',
  styleUrl: './stack.css',
})
export class Stack implements OnInit {
  private readonly portfolioService = inject(PortfolioService);

  items = signal<StackItem[]>([]);
  loading = signal(true);

  groups = computed<StackGroup[]>(() => {
    const map = new Map<string, StackItem[]>();

    for (const item of this.items()) {
      const list = map.get(item.category) ?? [];
      list.push(item);
      map.set(item.category, list);
    }

    return Array.from(map.entries()).map(([category, items]) => ({
      category,
      items,
    }));
  });

  ngOnInit() {
    this.portfolioService.getStack().subscribe({
      next: (items) => {
        this.items.set(items);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  groupClass(index: number): string {
    return `sg-${(index % 5) + 1}`;
  }
}