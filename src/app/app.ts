import { Component, OnInit, inject } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
// import { SvgIcon } from './svg-icon/svg-icon';
import { TheNavbar } from './the-navbar/the-navbar';
import { TheHome } from "./the-home/the-home";
import { TheFooter } from "./the-footer/the-footer";
import { WhatsappFloat } from "./whatsapp-float/whatsapp-float";
import { ToastContainer } from "./toast-container/toast-container";
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [TheNavbar, RouterModule, TheFooter, WhatsappFloat, ToastContainer],
  // imports: [TheNavbar, TheHome, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private titleService = inject(Title);
  protected title = 'felmanicbrandz-mannequins';
  private router = inject(Router);

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        let route = this.router.routerState.root;

        // Traverse to deepest active route
        while (route.firstChild) {
          route = route.firstChild;
        }

        const shouldScroll = route.snapshot.data['scrollToTop'];

        if (shouldScroll) {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      });
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }
}
