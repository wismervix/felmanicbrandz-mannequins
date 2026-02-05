import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Product, CategoryKey, getCoursesByCategory } from '../../products';
import { EachProduct } from "../each-product/each-product";

@Component({
  selector: 'app-mannequin-shop-tab-view',
  standalone: true,
  imports: [RouterModule, EachProduct],
  templateUrl: './mannequin-shop-tab-view.html',
  styleUrl: './mannequin-shop-tab-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MannequinShopTabView implements OnInit {
  private titleService = inject(Title);

  // Pagination config
  readonly pageSize = 12;
  currentPage = 1;
  totalPages = 0;

  // Data
  allProducts: Product[] = [];
  currentProducts: Product[] = [];

  ngOnInit(): void {
    this.titleService.setTitle('Felmanic Mannequins | Shop | Mannequins');
    // Initialize with mannequins products
    this.loadProducts('mannequins');
  }

  getCoursesByCategory(category: CategoryKey) {
    return getCoursesByCategory(category);
  }

  // Add method to load products
  loadProducts(category: CategoryKey): void {
    this.allProducts = this.getCoursesByCategory(category);

    this.totalPages = Math.ceil(this.allProducts.length / this.pageSize);
    this.currentPage = 1;

    this.updateCurrentProducts();
  }

  updateCurrentProducts(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.currentProducts = this.allProducts.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;

    this.currentPage = page;
    this.updateCurrentProducts();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
