import {
  Component,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
// import { SearchFilter } from "../search-filter/search-filter";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home-shop-tab',
  imports: [RouterModule, NgClass],
  // imports: [RouterModule, SearchFilter],
  templateUrl: './home-shop-tab.html',
  styleUrl: './home-shop-tab.scss',
})
export class HomeShopTab {
  @ViewChild('tabsWrapper') tabsWrapper!: ElementRef<HTMLDivElement>;
  @ViewChildren('tabEl') tabEls!: QueryList<ElementRef<HTMLElement>>;

  tabs = [
    { name: 'all', label: 'All', route: 'all' },
    { name: 'hanger', label: 'Hangers', route: 'hangers' },
    {
      name: 'mannequins',
      label: 'Mannequins',
      route: 'mannequins',
    },
  ];

  constructor(private router: Router) {}

  goBack() {
    window.history.back();
  }

  isActiveTab(route: string): boolean {
    const currentUrl = this.router.url;

    if (route === 'all') {
      // Activate tab if URL is '' (home) or 'hangers'
      return currentUrl === '/' || currentUrl.includes('/all');
    }

    if (route === 'hangers') {
      // Activate tab if URL is '' (home) or 'hangers'
      // return currentUrl === '/' || currentUrl.includes('/hangers');
      return currentUrl.includes('/hangers');
    }

    if (route === 'mannequins') {
      return currentUrl.includes('/mannequins');
    }

    return false;
  }

  scrollActiveTabIntoView(index?: number) {
    const tabs = this.tabEls.toArray();

    const target =
      index !== undefined
        ? tabs[index]
        : tabs.find((tab) => tab.nativeElement.classList.contains('active'));

    target?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }
}
