import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../../../../core/models/products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductFilterService {
  searchTerm = signal('');
  category = signal<'all' | 'mannequins' | 'hangers' | 'accessories'>('all');
  sort = signal<'default' | 'priceLow' | 'priceHigh' | 'nameAZ' | 'nameZA'>(
    'default',
  );
  priceRange = signal<[number, number] | null>(null);
  setPriceRange(range: [number, number] | null) {
    this.priceRange.set(range);
  }

  private products = signal<Product[]>([]);

  // dynamic limits from loaded products
  minPrice = computed(() => {
    const prices = this.products().map((p) => p.price);
    if (!prices.length) return 0;
    return Math.floor(Math.min(...prices) / 1000) * 1000;
  });

  maxPrice = computed(() => {
    const prices = this.products().map((p) => p.price);
    if (!prices.length) return 0;
    return Math.ceil(Math.max(...prices) / 1000) * 1000;
  });

  setProducts(products: Product[]) {
    this.products.set(products);
  }

  setSearch(term: string) {
    this.searchTerm.set(term.toLowerCase());
  }

  setCategory(cat: any) {
    this.category.set(cat);
  }

  setSort(sort: any) {
    this.sort.set(sort);
  }

  filteredProducts = computed(() => {
    let result = this.products();

    const search = this.searchTerm();
    const category = this.category();
    const sort = this.sort();
    const range = this.priceRange();

    if (range) {
      result = result.filter((p) => p.price >= range[0] && p.price <= range[1]);
    }

    if (category !== 'all') {
      result = result.filter((p) => p.category === category);
    }

    if (search) {
      result = result.filter((p) => p.title.toLowerCase().includes(search));
    }

    if (sort === 'priceLow') {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === 'priceHigh') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    if (sort === 'nameAZ') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sort === 'nameZA') {
      result = [...result].sort((a, b) => b.title.localeCompare(a.title));
    }

    return result;
  });
}
