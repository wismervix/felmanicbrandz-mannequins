import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsStore } from '../../../../../core/data/products.store';
import { Product } from '../../../../../core/models/products.model';
import { ProductForm } from '../../components/product-form/product-form';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-product-edit-page',
  imports: [ProductForm],
  templateUrl: './product-edit-page.html',
  styleUrl: './product-edit-page.scss',
})
export class ProductEditPage {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private productsStore = inject(ProductsStore);

  product = signal<Product | null>(null);

  loading = signal(false);
  errorMessage = signal<string | null>(null);

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const foundProduct = this.productsStore.getProductById(id);

    if (foundProduct) {
      this.product.set(foundProduct);
    } else {
      this.router.navigate(['/admin/products']);
    }
  }

  handleUpdate(data: any) {
    this.loading.set(true);
    this.errorMessage.set(null);

    this.productsStore
      .updateProduct(data.product)
      .pipe(
        switchMap((res) =>
          this.productsStore.syncProductImages(
            res.product.id,
            data.thumbnail ?? null,
            data.images ?? [],
            data.removedImages ?? [],
          ),
        ),
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/admin/products']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage.set(err);
        },
        complete: () => {
          this.loading.set(false);
        },
      });
  }
}
