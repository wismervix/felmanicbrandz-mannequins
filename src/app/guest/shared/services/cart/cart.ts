import { Injectable, signal, effect, computed } from '@angular/core';
import { CartItem } from '../../models/checkout';
import { Product } from '../../../../core/models/products.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly STORAGE_KEY = 'mannequin_cart';

  private items = signal<CartItem[]>(this.loadFromStorage());

  constructor() {
    // auto-persist cart changes
    effect(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items()));
      }
    });
  }

  // -------------------------
  // READ
  // -------------------------

  getItems = computed(() => this.items());

  totalQuantity = computed(() =>
    this.items().reduce((sum, i) => sum + i.quantity, 0),
  );

  // (optional extra)
  totalPrice = computed(() =>
    this.items().reduce((sum, i) => sum + i.product.price * i.quantity, 0),
  );

  // -------------------------
  // WRITE
  // -------------------------

  add(product: Product, quantity: number) {
    this.items.update((items) => {
      const existing = items.find(
        (i) =>
          i.product.id === product.id &&
          i.product.category === product.category,
      );

      if (existing) {
        return items.map((i) =>
          i.product.id === product.id && i.product.category === product.category
            ? { ...i, quantity: i.quantity + quantity }
            : i,
        );
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
    if (qty <= 0) return this.remove(product);

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

  // -------------------------
  // STORAGE
  // -------------------------

  private loadFromStorage(): CartItem[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }
}
