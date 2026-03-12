import {
  Component,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SearchFilter } from '../../../../shared/components/search-filter/search-filter';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-the-shop',
  standalone: true,
  imports: [RouterModule, SearchFilter, NgClass],
  templateUrl: './the-shop.html',
  styleUrl: './the-shop.scss',
})
export class TheShop {
  @ViewChild('shopTabsWrapper') shopTabsWrapper!: ElementRef<HTMLDivElement>;
  @ViewChildren('shopTabEl') shopTabEls!: QueryList<ElementRef<HTMLElement>>;

  tabs = [
    { name: 'shop-all', label: 'All', route: 'all' },
    { name: 'shop-hanger', label: 'Hangers', route: 'hangers' },
    { name: 'shop-mannequin', label: 'Mannequins', route: 'mannequins' },
  ];

  constructor(private router: Router) {}

  goBack() {
    window.history.back();
  }

  isActiveTab(route: string): boolean {
    const currentUrl = this.router.url;

    if (route === 'all') {
      // Activate tab if URL is '' (shop) or 'hangers'
      return currentUrl === '/shop' || currentUrl.includes('/all');
    }

    if (route === 'hangers') {
      // Activate tab if URL is '' (shop) or 'hangers'
      return currentUrl.includes('/hangers');
    }

    if (route === 'mannequins') {
      return currentUrl.includes('/mannequins');
    }

    return false;
  }

  scrollActiveTabIntoView(index?: number) {
    const tabs = this.shopTabEls.toArray();

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
