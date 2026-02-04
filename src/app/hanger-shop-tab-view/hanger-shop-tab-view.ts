import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { Product, CategoryKey, getCoursesByCategory } from '../../products';

@Component({
  selector: 'app-hanger-shop-tab-view',
  standalone: true,
  imports: [TitleCasePipe, RouterModule],
  templateUrl: './hanger-shop-tab-view.html',
  styleUrl: './hanger-shop-tab-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangerShopTabView implements OnInit {
  private titleService = inject(Title);

  // Pagination config
  readonly pageSize = 12;
  currentPage = 1;
  totalPages = 0;

  // Data
  allProducts: Product[] = [];
  currentProducts: Product[] = [];

  ngOnInit(): void {
    this.titleService.setTitle('Felmanic Mannequins | Shop | Hanger');
    // Initialize with hangers products
    this.loadProducts('hangers');
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

  getCategoryDisplayName(category: CategoryKey): string {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }

  // Helper method to get star rating for a specific product
  getStarWidth(product: Product): number {
    const rating = product?.rating ?? 0;
    return (Math.min(Math.max(rating, 0), 5) / 5) * 100; // 0-100%
  }

  // Helper method to check if a product is best selling
  isBestSelling(product: Product): boolean {
    return product?.bestSelling === 1;
  }
}
