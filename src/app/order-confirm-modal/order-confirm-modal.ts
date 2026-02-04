import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { Product } from '../../products';

export interface OrderPayload {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-order-confirm-modal',
  imports: [],
  templateUrl: './order-confirm-modal.html',
  styleUrl: './order-confirm-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConfirmModal {
  order = input.required<OrderPayload>();
  closed = output<'confirm' | 'cancel'>();

  confirm() {
    this.closed.emit('confirm');
  }

  cancel() {
    this.closed.emit('cancel');
  }

  totalPrice = computed(() =>
    this.order() ? this.order()!.product.price * this.order()!.quantity : 0,
  );
}
