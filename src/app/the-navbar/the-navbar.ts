import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  AfterViewInit,
} from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { CartService } from '../services/cart';
import { CartModal } from '../cart-modal/cart-modal';
// import { SvgIcon } from '../svg-icon/svg-icon';

import * as bootstrap from 'bootstrap';
// declare var bootstrap: any;

@Component({
  selector: 'app-the-navbar',
  imports: [RouterModule, CartModal],
  // imports: [SvgIcon],
  templateUrl: './the-navbar.html',
  styleUrl: './the-navbar.scss',
})
export class TheNavbar implements OnInit, OnDestroy, AfterViewInit {
  currentTime = '';
  private timeInterval: any;

  lastScrollTop = 0;
  showCart = false;
  // showNavbar = true;
  showNavbar = false;
  // heroHeight = 0;
  private ticking = false;
  private pastHero = false;
  private hasHero = false;

  private heroObserver?: IntersectionObserver;
  private routerSubscription?: Subscription;

  constructor(
    private router: Router,
    public cart: CartService,
  ) {}

  collapseNav() {
    const nav = document.getElementById('pageNav');

    if (!nav) return;

    const bsCollapse = bootstrap.Collapse.getInstance(nav);

    if (bsCollapse) {
      bsCollapse.hide();
    }
  }

  toggleCart() {
    const nav = document.getElementById('pageNav');

    if (!nav) return;

    const bsCollapse = bootstrap.Collapse.getInstance(nav);

    if (bsCollapse) {
      bsCollapse.hide();
    }
    // this.showCart = !this.showCart;
    this.showCart = true;
    console.log('Show Cart: ', this.showCart);
  }

  closeCart() {
    this.showCart = false;
    console.log('Show Cart: ', this.showCart);
  }

  ngOnInit() {
    this.updateTime();
    this.timeInterval = setInterval(() => this.updateTime(), 1000);

    // Subscribe to router changes to detect when we switch pages
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // Reset state on route change
        this.pastHero = false;
        this.hasHero = false;
        this.showNavbar = false;
        this.lastScrollTop = 0;

        // Reinitialize the hero observer for the new page
        setTimeout(() => this.initializeHeroObserver(), 100);
      });
  }

  ngAfterViewInit() {
    // Initialize after view is ready
    this.initializeHeroObserver();
  }

  private initializeHeroObserver() {
    // Clean up previous observer if it exists
    if (this.heroObserver) {
      this.heroObserver.disconnect();
    }

    const hero = document.querySelector<HTMLElement>('.hero');

    if (hero) {
      this.hasHero = true;

      this.heroObserver = new IntersectionObserver(
        ([entry]) => {
          this.pastHero = !entry.isIntersecting;

          // Hide navbar instantly when entering hero section
          if (!this.pastHero) {
            this.showNavbar = false;
          } else {
            // When past hero, show navbar if at top
            this.showNavbar = window.scrollY > 100;
          }
        },
        {
          threshold: 0,
          rootMargin: '-70px 0px 0px 0px', // Adjust for navbar height
        },
      );

      this.heroObserver.observe(hero);
    } else {
      // No hero section on this page - use simplified behavior
      this.hasHero = false;
      this.pastHero = true; // We're always "past hero" if there's no hero
    }
  }

  @HostListener('window:scroll', [])
  onScroll() {
    if (!this.hasHero) {
      // Simplified behavior for pages without hero
      this.handleScrollForNonHeroPages();
      return;
    }

    if (!this.pastHero || this.ticking) return;

    this.ticking = true;

    requestAnimationFrame(() => {
      const scrollTop = window.scrollY || 0;
      const delta = scrollTop - this.lastScrollTop;

      // Ignore micro scrolls (trackpads, momentum)
      if (Math.abs(delta) > 8) {
        if (delta > 0) {
          // scrolling down
          this.showNavbar = false;
        } else {
          // scrolling up
          this.showNavbar = true;
        }
      } else if (scrollTop < 100) {
        // Near top of page
        this.showNavbar = false;
      }

      this.lastScrollTop = Math.max(scrollTop, 0);
      this.ticking = false;
    });
  }

  private handleScrollForNonHeroPages() {
    if (this.ticking) return;

    this.ticking = true;

    requestAnimationFrame(() => {
      const scrollTop = window.scrollY || 0;
      const delta = scrollTop - this.lastScrollTop;

      // Show/hide based on scroll direction
      if (Math.abs(delta) > 10) {
        if (delta > 0 && scrollTop > 100) {
          // Scrolling down and not at top
          this.showNavbar = false;
        } else if (delta < 0) {
          // Scrolling up
          this.showNavbar = true;
        }
      } else if (scrollTop <= 100) {
        // At top of page
        this.showNavbar = true;
      }

      this.lastScrollTop = scrollTop;
      this.ticking = false;
    });
  }

  ngOnDestroy() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  private updateTime() {
    const now = new Date();
    // Format like "9:41" (Apple style)
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    this.currentTime = `${hours}:${minutes}`;

    // Optional: Add AM/PM for 12-hour format
    // const ampm = hours >= 12 ? 'PM' : 'AM';
    // const displayHours = hours % 12 || 12;
    // this.currentTime = `${displayHours}:${minutes} ${ampm}`;
  }
}
