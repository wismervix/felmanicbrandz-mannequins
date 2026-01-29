import {
  Component,
  input,
  computed,
  signal,
  effect,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Product, Category } from '../../products';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-each-product',
  imports: [TitleCasePipe],
  templateUrl: './each-product.html',
  styleUrl: './each-product.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EachProduct {
  product = input.required<Product>();
  category = input.required<Category>();

  // constructor() {
  //   effect(() => {
  //     const product = this.product();
  //     if (product) {
  //       console.log('Product mounted:', product);
  //     }
  //   });
  // }

  // Computed signals for reactive values
  starWidth = computed(() => {
    const rating = this.product()?.rating ?? 0;
    return (Math.min(Math.max(rating, 0), 5) / 5) * 100; // 0-100%
  });

  isBestSelling = computed(() => this.product()?.bestSelling === 1);

  // Event handler
  onButtonClick() {
    if (this.isBestSelling()) {
      console.log('Continue studying:', this.product()?.name);
      // Emit event or navigate
      // this.continueStudy.emit(this.product()!);
    } else {
      console.log('Course locked:', this.product()?.name);
    }
  }
}
