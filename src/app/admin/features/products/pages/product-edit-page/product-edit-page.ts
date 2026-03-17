import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsStore } from '../../../../../core/data/products.store';
import { Product } from '../../../../../core/models/products.model';
import { ProductForm } from '../../components/product-form/product-form';

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
    
    this.productsStore.updateProduct(data.product).subscribe({
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
