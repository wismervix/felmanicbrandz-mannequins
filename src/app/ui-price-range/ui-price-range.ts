import { Component, effect, signal } from '@angular/core';
import { ProductFilterService } from '../services/product-filter';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-ui-price-range',
  imports: [DecimalPipe],
  templateUrl: './ui-price-range.html',
  styleUrl: './ui-price-range.scss',
})
export class UiPriceRange {
  constructor(public filter: ProductFilterService) {}

  min = signal(0);
  max = signal(0);

  localMin = signal(0);
  localMax = signal(0);

  // sync when products change
  initEffect = effect(() => {
    const min = this.filter.minPrice();
    const max = this.filter.maxPrice();

    this.min.set(min);
    this.max.set(max);

    this.localMin.set(min);
    this.localMax.set(max);

    this.filter.setPriceRange([min, max]);
  });

  onMinChange(value: number) {
    if (value > this.localMax()) return;
    this.localMin.set(value);
    this.filter.setPriceRange([value, this.localMax()]);
  }

  onMaxChange(value: number) {
    if (value < this.localMin()) return;
    this.localMax.set(value);
    this.filter.setPriceRange([this.localMin(), value]);
  }
}
