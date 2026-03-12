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

import { EachProduct } from '../../../../shared/components/each-product/each-product';
import { ProductFilterService } from '../../../../shared/services/product-filter/product-filter';
import { DataRow } from '../../../../shared/components/data-row/data-row';
import { ProductsStore } from '../../../../../core/data/products.store';
import { ApiService } from '../../../../../core/services/api.service';

@Component({
  selector: 'app-mannequin-shop-tab-view',
  standalone: true,
  imports: [RouterModule, EachProduct, DataRow],
  templateUrl: './mannequin-shop-tab-view.html',
  styleUrl: './mannequin-shop-tab-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MannequinShopTabView {
  public productsStore = inject(ProductsStore);
  public apiService = inject(ApiService);

  constructor() {
    this.productsStore.setCategory('mannequins');
  }

  products = this.productsStore.paginatedProducts;
  totalPages = this.productsStore.totalPages;
  currentPage = this.productsStore.currentPageIndex;

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
}
