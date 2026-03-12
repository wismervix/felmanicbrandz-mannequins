import { Injectable } from '@angular/core';
import { CartItem, OrderPayload } from '../../models/checkout';
@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  adminNumber = '2349021866293';

  openWhatsApp(items: CartItem[]) {
    const lines = items.map(
      (i) =>
        `• ${i.product.title} × ${i.quantity} – ₦${i.product.price * i.quantity}`,
    );

    const total = items.reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0,
    );

    const msg = `
Hello, I want to place an order.

Items:
${lines.join('\n')}

Total: ₦${total}

Name:
Delivery location:
Preferred time:
`.trim();

    window.open(
      `https://wa.me/${this.adminNumber}?text=${encodeURIComponent(msg)}`,
      '_blank',
    );
  }
}
