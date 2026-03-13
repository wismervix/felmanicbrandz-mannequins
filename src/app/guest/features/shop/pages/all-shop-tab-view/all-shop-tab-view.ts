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
import { PaginatedProductsService } from '../../../../shared/services/paginated-products/paginated-products';
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
// export class AllShopTabView {
export class AllShopTabView implements OnInit {
  public paginatedProducts = inject(PaginatedProductsService);
  public apiService = inject(ApiService);

  ngOnInit(): void {
    this.paginatedProducts.setCategory('all');
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
