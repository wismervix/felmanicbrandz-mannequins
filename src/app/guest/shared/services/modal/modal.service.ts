// modal.service.ts
import {
  Injectable,
  ApplicationRef,
  Injector,
  ComponentRef,
  createComponent,
} from '@angular/core';
import { DetailsModal } from '../../components/details-modal/details-modal';
import { Product } from '../../../../core/models/products.model';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modalRef!: ComponentRef<DetailsModal>;

  constructor(
    private appRef: ApplicationRef,
    private injector: Injector,
  ) {}

  open(product: Product) {
    // Create component dynamically using the new API
    this.modalRef = createComponent(DetailsModal, {
      environmentInjector: this.appRef.injector,
    });

    // ✅ PASS THE PRODUCT HERE
    this.modalRef.setInput('product', product);

    // Listen for close event
    this.modalRef.instance.detailModalClosed.subscribe(() => this.close());

    // Attach view to app
    this.appRef.attachView(this.modalRef.hostView);

    // Append modal root element to body
    document.body.appendChild((this.modalRef.hostView as any).rootNodes[0]);
  }

  close() {
    if (this.modalRef) {
      this.appRef.detachView(this.modalRef.hostView);
      this.modalRef.destroy();
    }
  }
}
