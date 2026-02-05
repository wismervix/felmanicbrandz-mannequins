import {
  Component,
  input,
  computed,
  signal,
  output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Product, Category } from '../../products';
import { TitleCasePipe, DecimalPipe } from '@angular/common';
import { CartService } from '../services/cart';
import { ToastService } from '../services/toast';

@Component({
  selector: 'app-each-product',
  imports: [TitleCasePipe, DecimalPipe],
  templateUrl: './each-product.html',
  styleUrl: './each-product.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EachProduct {
  product = input.required<Product>();
  category = input.required<Category>();

  constructor(
    private cart: CartService,
    private toast: ToastService,
  ) {}

  addToCart() {
    this.cart.add(this.product(), this.quantity());
    // this.toast.show(`Added ${this.product()?.name} to cart`);
    this.toast.show(
      `Added ${this.quantity()} × ${this.product().name} to cart`,
      'success',
    );
    console.log('Cart: ', this.cart.getItems()());
    this.resetQuantity();
  }

  // constructor() {
  //   effect(() => {
  //     const product = this.product();
  //     if (product) {
  //       console.log('Product mounted:', product);
  //     }
  //   });
  // }

  // Computed signals for reactive values
  quantity = signal(1);

  increment() {
    this.quantity.update((q) => q + 1);
  }

  decrement() {
    this.quantity.update((q) => Math.max(1, q - 1));
  }

  resetQuantity() {
    this.quantity.set(1);
  }

  starWidth = computed(() => {
    const rating = this.product()?.rating ?? 0;
    return (Math.min(Math.max(rating, 0), 5) / 5) * 100; // 0-100%
  });

  isBestSelling = computed(() => this.product()?.bestSelling === 1);
}
