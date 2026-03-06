import { Component, OnInit, inject } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
// import { SvgIcon } from './svg-icon/svg-icon';
import { TheNavbar } from '../layout/the-navbar/the-navbar';
import { TheFooter } from '../shared/components/the-footer/the-footer';
import { WhatsappFloat } from '../shared/components/whatsapp-float/whatsapp-float';
import { ToastContainer } from '../shared/components/toast-container/toast-container';
import { filter } from 'rxjs';

@Component({
  selector: 'app-guest',
  imports: [TheNavbar, RouterModule, TheFooter, WhatsappFloat, ToastContainer],
  templateUrl: './guest.html',
  styleUrl: './guest.scss',
})
export class Guest implements OnInit {
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
