import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsStore } from '../../../../../core/data/products.store';
import { Product } from '../../../../../core/models/products.model';
import { ProductForm } from '../../components/product-form/product-form';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-product-create-page',
  imports: [ProductForm],
  templateUrl: './product-create-page.html',
  styleUrl: './product-create-page.scss',
})
export class ProductCreatePage {
  private router = inject(Router);
  private productsStore = inject(ProductsStore);

  loading = signal(false);
  errorMessage = signal<string | null>(null);

  handleCreate(data: any) {
    this.loading.set(true);
    this.errorMessage.set(null);

    this.productsStore
      .createProduct(data.product)
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
