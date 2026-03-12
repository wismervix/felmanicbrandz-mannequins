import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SvgIcon } from '../../../../shared/components/svg-icon/svg-icon';
import { BaseCarousel } from '../../components/base-carousel/base-carousel';
import { ProductsStore } from '../../../../../core/data/products.store';
import { ProductFilterService } from '../../../../shared/services/product-filter/product-filter';

@Component({
  selector: 'app-hanger-tab-view',
  standalone: true,
  imports: [RouterModule, BaseCarousel, SvgIcon],
  templateUrl: './hanger-tab-view.html',
  styleUrl: './hanger-tab-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// export class HangerTabView implements OnInit {
export class HangerTabView {
  public filterService = inject(ProductFilterService);
  public productsStore = inject(ProductsStore);

  constructor() {
    this.productsStore.setCategory('hangers');
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
