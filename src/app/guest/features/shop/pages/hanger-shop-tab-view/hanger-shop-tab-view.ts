import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
  computed,
  effect,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

import {
  Product,
  CategoryKey,
  getCoursesByCategory,
} from '../../../../shared/data/products';
import { EachProduct } from '../../../../shared/components/each-product/each-product';
import { ProductFilterService } from '../../../../shared/services/product-filter/product-filter';
import { DataRow } from '../../../../shared/components/data-row/data-row';
import { ProductsStore } from '../../../../../core/data/products.store';
import { ApiService } from '../../../../../core/services/api.service';

@Component({
  selector: 'app-hanger-shop-tab-view',
  standalone: true,
  imports: [RouterModule, EachProduct, DataRow],
  templateUrl: './hanger-shop-tab-view.html',
  styleUrl: './hanger-shop-tab-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// export class HangerShopTabView implements OnInit {
export class HangerShopTabView {
  public productsStore = inject(ProductsStore);
  public apiService = inject(ApiService);

  products = this.productsStore.products;
  currentPage = this.productsStore.currentPageIndex;
  totalPages = this.productsStore.totalPages;

  nextPage() {
    this.productsStore.nextPage();
  }

  prevPage() {
    this.productsStore.prevPage();
  }

  goToPage(page: number) {
    this.productsStore.goToPage(page);
  }

  pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i),
  );
  // private titleService = inject(Title);

  // // Pagination config
  // readonly pageSize = 12;
  // currentPage = signal(1);

  // // Data
  // // allProducts: Product[] = [];
  // // currentProducts: Product[] = [];

  // constructor(public filter: ProductFilterService) {
  //   // reset pagination when filters change
  //   effect(() => {
  //     this.filter.filteredProducts();
  //     this.currentPage.set(1);
  //   });
  // }

  // ngOnInit(): void {
  //   this.titleService.setTitle('Felmanic Mannequins | Shop | Hanger');

  //   // RESET FILTERS when entering this tab
  //   this.filter.setSearch('');
  //   this.filter.setCategory('all');
  //   this.filter.setSort('default');

  //   const products = this.getCoursesByCategory('hangers');
  //   this.filter.setProducts(products);
  // }

  // getCoursesByCategory(category: CategoryKey) {
  //   return getCoursesByCategory(category);
  // }

  // pagedProducts = computed(() => {
  //   const products = this.filter.filteredProducts();
  //   const page = this.currentPage();

  //   const start = (page - 1) * this.pageSize;
  //   return products.slice(start, start + this.pageSize);
  // });

  // totalPages = computed(() => {
  //   return Math.ceil(this.filter.filteredProducts().length / this.pageSize);
  // });

  // goToPage(page: number): void {
  //   this.currentPage.set(page);
  // }

  // nextPage(): void {
  //   if (this.currentPage() < this.totalPages()) {
  //     this.currentPage.update((p) => p + 1);
  //   }
  // }

  // prevPage(): void {
  //   if (this.currentPage() > 1) {
  //     this.currentPage.update((p) => p - 1);
  //   }
  // }

  // getPageNumbers(): number[] {
  //   return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  // }
}
