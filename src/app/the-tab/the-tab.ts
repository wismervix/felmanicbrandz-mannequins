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
  selector: 'app-the-tab',
  imports: [RouterModule],
  templateUrl: './the-tab.html',
  styleUrl: './the-tab.scss',
})
export class TheTab implements AfterViewInit, AfterViewChecked {
  @ViewChild('tabsWrapper') tabsWrapper!: ElementRef<HTMLDivElement>;
  @ViewChildren('tabEl') tabEls!: QueryList<ElementRef<HTMLElement>>;

  tabs = [
    { name: 'hanger', label: 'Hangers', route: 'hanger' },
    // { name: 'strip', label: 'Strip', route: 'strip' },
    {
      name: 'mannequin',
      label: 'Mannequins',
      route: 'mannequin',
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
