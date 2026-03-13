import { computed, Injectable, signal, inject } from '@angular/core';
import { Product } from '../../../../core/models/products.model';
import { ProductsStore } from '../../../../core/data/products.store';

@Injectable({
  providedIn: 'root',
})
export class ProductFilterService {
  private productsStore = inject(ProductsStore);

  searchTerm = signal('');
  category = signal<'all' | 'mannequins' | 'hangers' | 'accessories'>('all');
  sort = signal<'default' | 'priceLow' | 'priceHigh' | 'nameAZ' | 'nameZA'>(
    'default',
  );
  priceRange = signal<[number, number] | null>(null);

  setSearch(term: string) {
    this.searchTerm.set(term.toLowerCase());
  }
  setCategory(cat: any) {
    this.category.set(cat);
  }
  setSort(sort: any) {
    this.sort.set(sort);
  }
  setPriceRange(range: [number, number] | null) {
    this.priceRange.set(range);
  }

  // dynamic limits from loaded products
  minPrice = computed(() => {
    const prices = this.productsStore
      .productsResponse()
      .products.map((p) => Number(p.price));
    
    if (!prices.length) return 0;
    return Math.floor(Math.min(...prices) / 1000) * 1000;
  });
  maxPrice = computed(() => {
    const prices = this.productsStore
      .productsResponse()
      .products.map((p) => Number(p.price));
    
    if (!prices.length) return 0;
    return Math.ceil(Math.max(...prices) / 1000) * 1000;
  });

  filteredProducts = computed(() => {
    let result = this.productsStore.productsResponse().products; // always reactive to store

    const search = this.searchTerm();
    const category = this.category();
    const sort = this.sort();
    const range = this.priceRange();

    if (category !== 'all')
      result = result.filter((p) => p.category === category);
    if (range)
      // result = result.filter((p) => p.price >= range[0] && p.price <= range[1]);
      result = result.filter((p) => {
        const price = Number(p.price);
        return price >= range[0] && price <= range[1];
      });
    if (search)
      result = result.filter((p) => p.title.toLowerCase().includes(search));

    if (sort === 'priceLow')
      result = [...result].sort((a, b) => Number(a.price) - Number(b.price));
    if (sort === 'priceHigh')
      result = [...result].sort((a, b) => Number(b.price) - Number(a.price));
    if (sort === 'nameAZ')
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'nameZA')
      result = [...result].sort((a, b) => b.title.localeCompare(a.title));

    return result;
  });
}
