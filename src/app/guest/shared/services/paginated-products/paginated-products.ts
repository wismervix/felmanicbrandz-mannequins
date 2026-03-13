import { Injectable, computed, signal } from '@angular/core';
import { ProductFilterService } from '../product-filter/product-filter';
import { Category } from '../../../../core/models/products.model';

@Injectable({ providedIn: 'root' })
export class PaginatedProductsService {
  private limit = 30;
  private currentPageSignal = signal(0);

  categorySignal = signal<Category | 'all'>('all');

  constructor(private filter: ProductFilterService) {}

  // Update category (tab can call this)
  setCategory(cat: Category | 'all') {
    this.categorySignal.set(cat);
    this.reset(); // optional: go back to first page whenever category changes
  }

  // Filtered products for this category
  private filteredByCategory = computed(() => {
    const cat = this.categorySignal();
    const allFiltered = this.filter.filteredProducts(); // reactive to search/sort/price
    if (cat === 'all') return allFiltered;
    return allFiltered.filter((p) => p.category === cat);
  });

  // Paginated products
  products = computed(() => {
    const start = this.currentPageSignal() * this.limit;
    return this.filteredByCategory().slice(start, start + this.limit);
  });

  totalPages = computed(() =>
    Math.ceil(this.filteredByCategory().length / this.limit),
  );

  currentPage = computed(() => this.currentPageSignal());

  nextPage() {
    if (this.currentPageSignal() + 1 < this.totalPages()) {
      this.currentPageSignal.set(this.currentPageSignal() + 1);
    }
  }

  prevPage() {
    if (this.currentPageSignal() > 0) {
      this.currentPageSignal.set(this.currentPageSignal() - 1);
    }
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages()) {
      this.currentPageSignal.set(page);
    }
  }

  reset() {
    this.currentPageSignal.set(0);
  }
}
