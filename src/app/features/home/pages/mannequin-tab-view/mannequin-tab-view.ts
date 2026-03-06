import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SvgIcon } from '../../../../shared/components/svg-icon/svg-icon';
import { BaseCarousel } from '../../components/base-carousel/base-carousel';
import {
  CategoryKey,
  getCoursesByCategory,
} from '../../../../shared/data/products';
import { ProductFilterService } from '../../../../shared/services/product-filter/product-filter';

@Component({
  selector: 'app-mannequin-tab-view',
  standalone: true,
  imports: [RouterModule, BaseCarousel, SvgIcon],
  templateUrl: './mannequin-tab-view.html',
  styleUrl: './mannequin-tab-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MannequinTabView {
  getCoursesByCategory(category: CategoryKey) {
    return getCoursesByCategory(category);
  }

  constructor(public filter: ProductFilterService) {}

  ngOnInit(): void {
    // RESET FILTERS when entering this tab
    this.filter.setSearch('');
    this.filter.setCategory('all');
    this.filter.setSort('default');

    const products = this.getCoursesByCategory('mannequins');
    this.filter.setProducts(products);
  }
}
