import { Component, computed, EventEmitter, inject, input, Output } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { CartService } from '../../services/cart/cart';
import { ToastService } from '../../services/toast/toast';
import { CommonModule } from "@angular/common";
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
    this.cart.add(this.product(), 1);
    this.toast.show(`Added 1 × ${this.product().title} to cart`, 'success');
    this.close();
  }

  @Output() detailModalClosed = new EventEmitter<void>();

  close() {
    this.detailModalClosed.emit();
  }
}
