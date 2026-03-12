import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { EachProduct } from '../../../../shared/components/each-product/each-product';
import { ProductFilterService } from '../../../../shared/services/product-filter/product-filter';
import { DataRow } from '../../../../shared/components/data-row/data-row';
import { ProductsStore } from '../../../../../core/data/products.store';
import { ApiService } from '../../../../../core/services/api.service';


@Component({
  selector: 'app-all-shop-tab-view',
  imports: [RouterModule, EachProduct, DataRow],
  templateUrl: './all-shop-tab-view.html',
  styleUrl: './all-shop-tab-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// export class AllShopTabView implements OnInit {
export class AllShopTabView {
  public filterService = inject(ProductFilterService);
  public productsStore = inject(ProductsStore);
  public apiService = inject(ApiService);

  constructor() {
    this.productsStore.setCategory(null);
  }

  // ngOnInit(): void {
  //   // RESET FILTERS when entering this tab
  //   this.filterService.setSearch('');
  //   this.filterService.setCategory('all');
  //   this.filterService.setSort('default');
  //   this.filterService.setPriceRange(null);
  // }

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
