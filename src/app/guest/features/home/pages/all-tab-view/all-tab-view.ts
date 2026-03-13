import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { SvgIcon } from '../../../../shared/components/svg-icon/svg-icon';
import { BaseCarousel } from '../../components/base-carousel/base-carousel';
import { PaginatedProductsService } from '../../../../shared/services/paginated-products/paginated-products';

@Component({
  selector: 'app-all-tab-view',
  imports: [RouterModule, SvgIcon, BaseCarousel],
  templateUrl: './all-tab-view.html',
  styleUrl: './all-tab-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// export class AllTabView {
export class AllTabView implements OnInit {
  public paginatedProducts = inject(PaginatedProductsService);

  ngOnInit(): void {
    this.paginatedProducts.setCategory('all');
  }

  products = this.paginatedProducts.products;
  totalPages = this.paginatedProducts.totalPages;
  currentPage = this.paginatedProducts.currentPage;
}
