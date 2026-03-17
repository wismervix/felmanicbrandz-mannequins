import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsStore } from '../../../../../core/data/products.store';
import { Product } from '../../../../../core/models/products.model';
import { ProductForm } from '../../components/product-form/product-form';

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
    
    this.productsStore.createProduct(data.product).subscribe({
      next: (res) => {
        const productId = res.product.id;

        if (
          data.thumbnail ||
          data.images?.length ||
          data.removedImages?.length
        ) {
          this.productsStore
            .uploadImages(
              productId,
              data.thumbnail,
              data.images,
              data.removedImages,
            )
            .subscribe(() => this.router.navigate(['/admin/products']));
        } else {
          this.router.navigate(['/admin/products']);
        }
      },

      error: (err) => {
        console.error(err);
        this.errorMessage.set(err);
        this.loading.set(false);
      },

      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
