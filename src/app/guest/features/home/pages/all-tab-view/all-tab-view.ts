import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SvgIcon } from '../../../../shared/components/svg-icon/svg-icon';
import { BaseCarousel } from '../../components/base-carousel/base-carousel';
import { ProductsStore } from '../../../../../core/data/products.store';
import { ProductFilterService } from '../../../../shared/services/product-filter/product-filter';

@Component({
  selector: 'app-all-tab-view',
  imports: [RouterModule, SvgIcon, BaseCarousel],
  templateUrl: './all-tab-view.html',
  styleUrl: './all-tab-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// export class AllTabView implements OnInit {
export class AllTabView {
  public filterService = inject(ProductFilterService);
  public productsStore = inject(ProductsStore);

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
}
