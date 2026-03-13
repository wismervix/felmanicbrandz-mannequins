import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SvgIcon } from '../../../../shared/components/svg-icon/svg-icon';
import { BaseCarousel } from '../../components/base-carousel/base-carousel';
import { PaginatedProductsService } from '../../../../shared/services/paginated-products/paginated-products';

@Component({
  selector: 'app-hanger-tab-view',
  standalone: true,
  imports: [RouterModule, BaseCarousel, SvgIcon],
  templateUrl: './hanger-tab-view.html',
  styleUrl: './hanger-tab-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// export class HangerTabView {
export class HangerTabView implements OnInit {
  public paginatedProducts = inject(PaginatedProductsService);

  ngOnInit(): void {
    this.paginatedProducts.setCategory('hangers');
  }

  products = this.paginatedProducts.products;
  totalPages = this.paginatedProducts.totalPages;
  currentPage = this.paginatedProducts.currentPage;
}
