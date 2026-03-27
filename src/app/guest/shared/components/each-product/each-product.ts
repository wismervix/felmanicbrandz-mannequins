import {
  Component,
  input,
  computed,
  signal,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { Product } from '../../../../core/models/products.model';
import { TitleCasePipe, DecimalPipe } from '@angular/common';
import { CartService } from '../../services/cart/cart';
import { ToastService } from '../../services/toast/toast';
import { ApiService } from '../../../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-each-product',
  imports: [TitleCasePipe, DecimalPipe, CommonModule],
  templateUrl: './each-product.html',
  styleUrl: './each-product.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EachProduct {
  public apiService = inject(ApiService);
  product = input.required<Product>();

  showDetailsCart: boolean = false;

  constructor(
    private cart: CartService,
    private toast: ToastService,
    private modalService: ModalService,
  ) {}

  openDetailsModal() {
    this.modalService.open(this.product());
  }

  addToCart() {
    this.cart.add(this.product(), this.quantity());
    this.toast.show(
      `Added ${this.quantity()} × ${this.product().title} to cart`,
      'success',
    );
    // console.log('Cart: ', this.cart.getItems());
    this.resetQuantity();
  }

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

  // Determine the badge text and class based on availability

  get availabilityBadge() {
    const status = this.product()?.availability_status;
    if (status === 'Out of Stock') {
      return { text: 'Out of Stock', class: 'badge-out-of-stock' };
    } else if (status === 'Preorder') {
      return { text: 'Ships Soon', class: 'badge-preorder' };
    } else {
      return null;
    }
  }
}
