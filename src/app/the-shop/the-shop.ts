import {
  Component,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SearchFilter } from '../search-filter/search-filter';

@Component({
  selector: 'app-the-shop',
  standalone: true,
  imports: [RouterModule, SearchFilter],
  templateUrl: './the-shop.html',
  styleUrl: './the-shop.scss',
})
export class TheShop {
  @ViewChild('shopTabsWrapper') shopTabsWrapper!: ElementRef<HTMLDivElement>;
  @ViewChildren('shopTabEl') shopTabEls!: QueryList<ElementRef<HTMLElement>>;

  tabs = [
    { name: 'shop-hanger', label: 'Hangers', route: 'hangers' },
    { name: 'shop-mannequin', label: 'Mannequins', route: 'mannequins' },
  ];

  constructor(private router: Router) {}

  goBack() {
    window.history.back();
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
