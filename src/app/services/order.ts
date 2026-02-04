import { Injectable } from '@angular/core';
import { OrderPayload } from '../order-confirm-modal/order-confirm-modal';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  adminNumber = '2349021866293';

  openWhatsApp(order: OrderPayload) {
    const msg = `
Hello, I want to place an order.

Product: ${order.product.name}
Price: ₦${order.product.price}
Quantity: ${order.quantity}
Total: ₦${order.product.price * order.quantity}
    `.trim();

    const url =
      `https://wa.me/${this.adminNumber}?text=` + encodeURIComponent(msg);

    window.open(url, '_blank');
  }
}
