import {
  Component,
  computed,
  EventEmitter,
  inject,
  input,
  Output,
  signal,
} from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { CartService } from '../../services/cart/cart';
import { ToastService } from '../../services/toast/toast';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../core/models/products.model';

@Component({
  selector: 'app-details-modal',
  imports: [CommonModule],
  templateUrl: './details-modal.html',
  styleUrl: './details-modal.scss',
})
export class DetailsModal {
  product = input.required<Product>();
  apiService = inject(ApiService);
  private cart = inject(CartService);
  private toast = inject(ToastService);

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

  // Rating width
  starWidth = computed(() => {
    const rating = this.product()?.rating ?? 0;
    return (Math.min(Math.max(rating, 0), 5) / 5) * 100;
  });

  // Badge logic
  get availabilityBadge() {
    const status = this.product()?.availability_status;
    if (status === 'Out of Stock')
      return { text: 'Out of Stock', class: 'badge-out-of-stock' };
    if (status === 'Preorder')
      return { text: 'Ships Soon', class: 'badge-preorder' };
    return null;
  }

  addToCart() {
    this.cart.add(this.product(), this.quantity());
    this.toast.show(
      `Added ${this.quantity()} × ${this.product().title} to cart`,
      'success',
    );
    // console.log('Cart: ', this.cart.getItems());
    this.resetQuantity();
    this.close();
  }

  @Output() detailModalClosed = new EventEmitter<void>();

  close() {
    this.detailModalClosed.emit();
  }
}
