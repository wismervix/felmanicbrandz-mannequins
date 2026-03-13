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
  selector: 'app-mannequin-tab-view',
  standalone: true,
  imports: [RouterModule, BaseCarousel, SvgIcon],
  templateUrl: './mannequin-tab-view.html',
  styleUrl: './mannequin-tab-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// export class MannequinTabView {
export class MannequinTabView implements OnInit {
  public paginatedProducts = inject(PaginatedProductsService);

  ngOnInit(): void {
    this.paginatedProducts.setCategory('mannequins');
  }

  products = this.paginatedProducts.products;
  totalPages = this.paginatedProducts.totalPages;
  currentPage = this.paginatedProducts.currentPage;
}
