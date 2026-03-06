import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'info' | 'error';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts = signal<Toast[]>([]);
  private counter = 0;

  getToasts() {
    return this.toasts.asReadonly();
  }

  show(message: string, type: ToastType = 'info') {
    const id = ++this.counter;

    this.toasts.update((t) => [...t, { id, message, type }]);

    setTimeout(() => this.remove(id), 3000);
  }

  remove(id: number) {
    this.toasts.update((t) => t.filter((toast) => toast.id !== id));
  }
}
