import { Injectable, signal } from '@angular/core';
import { Product, CartItem } from '../../products';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items = signal<CartItem[]>([]);

  getItems() {
    return this.items.asReadonly();
  }

  add(product: Product, quantity = 1) {
    this.items.update((items) => {
      const existing = items.find(
        (i) =>
          i.product.id === product.id &&
          i.product.category === product.category,
      );

      if (existing) {
        existing.quantity += quantity;
        return [...items];
      }
      return [...items, { product, quantity }];
    });
  }

  remove(product: Product) {
    this.items.update((items) =>
      items.filter(
        (i) =>
          i.product.id !== product.id ||
          i.product.category !== product.category,
      ),
    );
  }

  updateQty(product: Product, qty: number) {
  this.items.update((items) =>
    items.map((i) =>
      i.product.id === product.id && i.product.category === product.category
        ? { ...i, quantity: qty }
        : i,
    ),
  );
  }

  clear() {
    this.items.set([]);
  }

  totalQuantity() {
    return this.items().reduce((sum, i) => sum + i.quantity, 0);
  }
}
