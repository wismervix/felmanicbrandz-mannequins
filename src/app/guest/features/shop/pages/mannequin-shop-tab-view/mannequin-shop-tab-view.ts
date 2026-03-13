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
import { PaginatedProductsService } from '../../../../shared/services/paginated-products/paginated-products';
import { DataRow } from '../../../../shared/components/data-row/data-row';
import { ApiService } from '../../../../../core/services/api.service';

@Component({
  selector: 'app-mannequin-shop-tab-view',
  standalone: true,
  imports: [RouterModule, EachProduct, DataRow],
  templateUrl: './mannequin-shop-tab-view.html',
  styleUrl: './mannequin-shop-tab-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// export class MannequinShopTabView implements OnInit {
export class MannequinShopTabView {
  public paginatedProducts = inject(PaginatedProductsService);
  public apiService = inject(ApiService);

  ngOnInit(): void {
    this.paginatedProducts.setCategory('mannequins');
  }

  products = this.paginatedProducts.products;
  totalPages = this.paginatedProducts.totalPages;
  currentPage = this.paginatedProducts.currentPage;

  nextPage() {
    this.paginatedProducts.nextPage();
  }

  prevPage() {
    this.paginatedProducts.prevPage();
  }

  goToPage(page: number) {
    this.paginatedProducts.goToPage(page);
  }

  pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i),
  );
}
