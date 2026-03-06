import { Component, inject } from '@angular/core';
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

  handleCreate(data: any) {
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
      error: (err: any) => console.error(err),
    });
  }
}
