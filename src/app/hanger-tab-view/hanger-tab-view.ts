import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import { RouterModule } from '@angular/router';
// import { TitleCasePipe } from '@angular/common';

import { SvgIcon } from '../svg-icon/svg-icon';
import { AdSlider } from '../ad-slider/ad-slider';

import { CategoryKey, adsData, getCoursesByCategory } from '../../products';

@Component({
  selector: 'app-hanger-tab-view',
  standalone: true,
  imports: [RouterModule, AdSlider, SvgIcon],
  // imports: [RouterModule, AdSlider, SvgIcon, TitleCasePipe],
  templateUrl: './hanger-tab-view.html',
  styleUrl: './hanger-tab-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangerTabView {
  // Pagination state
  currentPage = 1;
  readonly totalPages = 3;

  getCoursesByCategory(category: CategoryKey) {
    return getCoursesByCategory(category);
  }

  getCategoryDisplayName(category: CategoryKey): string {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      // In a real app, you would fetch data for this page
      console.log(`Navigated to page ${page}`);
    }
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
