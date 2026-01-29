import {
  AfterViewInit,
  AfterViewChecked,
  Component,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-the-shop',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './the-shop.html',
  styleUrl: './the-shop.scss',
})
export class TheShop implements AfterViewInit, AfterViewChecked {
  @ViewChild('shopTabsWrapper') shopTabsWrapper!: ElementRef<HTMLDivElement>;
  @ViewChildren('shopTabEl') shopTabEls!: QueryList<ElementRef<HTMLElement>>;

  tabs = [
    { name: 'shop-hanger', label: 'Hangers', route: ['/shop'] },
    // { name: 'strip', label: 'Strip', route: 'strip' },
    {
      name: 'shop-mannequin',
      label: 'Mannequins',
      route: ['mannequin'],
    },
  ];

  private hasScrolled = false;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.scrollActiveTabIntoView();
  }

  ngAfterViewChecked() {
    // Prevent infinite scrolling loop
    if (!this.hasScrolled) {
      this.scrollActiveTabIntoView();
      this.hasScrolled = true;
    }
  }

  goBack() {
    window.history.back();
  }

  isActive(route: string): boolean {
    return this.router.url === route;
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

