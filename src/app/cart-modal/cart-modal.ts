import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrderService } from '../services/order';
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
    private orderService: OrderService,
    public cart: CartService,
  ) {}

  placeOrder() {
    this.orderService.openWhatsApp(this.cart.getItems()());
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

  close() {
    // emit close or toggle visibility
  }
}
