import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SvgIcon } from '../../../../shared/components/svg-icon/svg-icon';
import { BaseCarousel } from '../../components/base-carousel/base-carousel';
import { ProductsStore } from '../../../../../core/data/products.store';
@Component({
  selector: 'app-mannequin-tab-view',
  standalone: true,
  imports: [RouterModule, BaseCarousel, SvgIcon],
  templateUrl: './mannequin-tab-view.html',
  styleUrl: './mannequin-tab-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MannequinTabView {
  public productsStore = inject(ProductsStore);

  products = this.productsStore.products;
}
