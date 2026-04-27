import { Component } from '@angular/core';
import {
  RouterModule,
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import NProgress from 'nprogress';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor(private router: Router) {
    let timer: any;

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        timer = setTimeout(() => NProgress.start(), 100);
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        NProgress.done();
      }
    });
  }
}
