import {
  Component,
  OnInit,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TitleCasePipe } from '@angular/common';

// import { SvgIcon } from '../svg-icon/svg-icon';
import { AdSlider } from '../ad-slider/ad-slider';

import {
  CategoryKey,
  adsData,
  getCoursesByCategory,
  getCategoryFromCourse,
} from '../../products';

@Component({
  selector: 'app-the-shop',
  standalone: true,
  imports: [RouterModule, AdSlider, TitleCasePipe],
  // imports: [RouterModule, AdSlider, SvgIcon, TitleCasePipe],
  templateUrl: './the-shop.html',
  styleUrl: './the-shop.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TheShop implements OnInit {
  private titleService = inject(Title);

  // Reactive data
  readonly ads = adsData;
  readonly categories: CategoryKey[] = [
    'hangers',
    'mannequins',
    'linkedIn',
    'facebook',
  ];

  // Pagination state
  currentPage = 1;
  readonly totalPages = 3;

  // Customer care state
  isLiveAgentAvailable = true;

  ngOnInit(): void {
    this.titleService.setTitle('Ads University');
  }

  getCoursesByCategory(category: CategoryKey) {
    return getCoursesByCategory(category);
  }

  getCategoryFromCourse(courseId: number): string {
    const category = getCategoryFromCourse(courseId);
    return category ? category.toUpperCase() : 'Unknown Category';
  }

  getCategoryDisplayName(category: CategoryKey): string {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }

  // getPlatformDisplayName(platform: CategoryKey): string {
  //   return this.platformService.getDisplayName(platform);
  // }

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

  startChatWithAgent(): void {
    if (this.isLiveAgentAvailable) {
      console.log('Starting chat with live agent...');
      // Implement chat functionality here
      // e.g., window.open('chat://', '_blank');
    }
  }
}
