import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { SvgIcon } from '../../../../shared/components/svg-icon/svg-icon';
import { BaseCarousel } from '../../components/base-carousel/base-carousel';
import { ProductsStore } from '../../../../../core/data/products.store';

@Component({
  selector: 'app-hanger-tab-view',
  standalone: true,
  imports: [RouterModule, BaseCarousel, SvgIcon],
  templateUrl: './hanger-tab-view.html',
  styleUrl: './hanger-tab-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangerTabView {
  public productsStore = inject(ProductsStore);

  constructor() {
    this.productsStore.setCategory('hangers');
  }

  products = this.productsStore.paginatedProducts;
  totalPages = this.productsStore.totalPages;
  currentPage = this.productsStore.currentPageIndex;
}
