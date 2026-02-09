import {
  Component,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
// import { SearchFilter } from "../search-filter/search-filter";

@Component({
  selector: 'app-home-shop-tab',
  imports: [RouterModule],
  // imports: [RouterModule, SearchFilter],
  templateUrl: './home-shop-tab.html',
  styleUrl: './home-shop-tab.scss',
})
export class HomeShopTab {
  @ViewChild('tabsWrapper') tabsWrapper!: ElementRef<HTMLDivElement>;
  @ViewChildren('tabEl') tabEls!: QueryList<ElementRef<HTMLElement>>;

  tabs = [
    { name: 'hanger', label: 'Hangers', route: '/hangers' },
    {
      name: 'mannequins',
      label: 'Mannequins',
      route: '/mannequins',
    },
  ];

  constructor(private router: Router) {}

  goBack() {
    window.history.back();
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
