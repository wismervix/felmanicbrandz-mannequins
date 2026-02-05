import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderConfirmModal } from './order-confirm-modal';

describe('OrderConfirmModal', () => {
  let component: OrderConfirmModal;
  let fixture: ComponentFixture<OrderConfirmModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderConfirmModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderConfirmModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
