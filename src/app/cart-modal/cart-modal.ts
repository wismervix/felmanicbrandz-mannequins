import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { CheckoutService } from '../services/checkout';
import { CartService } from '../services/cart';
@Component({
  selector: 'app-cart-modal',
  imports: [],
  templateUrl: './cart-modal.html',
  styleUrl: './cart-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartModal {
  constructor(
    private checkoutService: CheckoutService,
    public cart: CartService,
  ) {}

  placeOrder() {
    this.checkoutService.openWhatsApp(this.cart.getItems()());
    this.cart.clear();
  }

  inc(item: any) {
    this.cart.updateQty(item.product.id, item.quantity + 1);
  }

  dec(item: any) {
    if (item.quantity > 1) {
      this.cart.updateQty(item.product.id, item.quantity - 1);
    }
  }

  remove(item: any) {
    this.cart.remove(item.product.id);
  }

  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }
}
