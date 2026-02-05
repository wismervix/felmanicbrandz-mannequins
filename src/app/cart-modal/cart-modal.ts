import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { CheckoutService } from '../services/checkout';
import { CartService } from '../services/cart';
import { ToastService } from '../services/toast';
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
    private toast: ToastService,
  ) {}

  placeOrder() {
    this.checkoutService.openWhatsApp(this.cart.getItems()());
    this.cart.clear();

    this.toast.show('Order sent to WhatsApp', 'success');
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

  totalItems() {
    return this.cart
      .getItems()()
      .reduce((sum, i) => sum + i.quantity, 0);
  }

  totalPrice() {
    return this.cart
      .getItems()()
      .reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  }

  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }
}
