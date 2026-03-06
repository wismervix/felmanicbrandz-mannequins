import { Routes } from '@angular/router';
import { Guest } from './guest/guest';

export const GUEST_ROUTES: Routes = [
  {
    path: '',
    component: Guest,
    children: [
      {
        path: '',
        data: { scrollToTop: true },
        loadChildren: () =>
          import('./features/home/home.routes').then((m) => m.HOME_ROUTES),
      },
      {
        path: 'shop',
        data: { scrollToTop: true },
        loadChildren: () =>
          import('./features/shop/shop.routes').then((m) => m.SHOP_ROUTES),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./features/about/about.routes').then((m) => m.ABOUT_ROUTES),
        data: { scrollToTop: true },
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('./features/contact/contact.routes').then(
            (m) => m.CONTACT_ROUTES,
          ),
        data: { scrollToTop: true },
      },
      {
        path: 'privacy-policy',
        loadChildren: () =>
          import('./features/privacy/privacy.routes').then(
            (m) => m.PRIVACY_ROUTES,
          ),
        data: { scrollToTop: true },
      },
      {
        path: 'terms-and-conditions',
        loadChildren: () =>
          import('./features/terms/terms.routes').then((m) => m.TERMS_ROUTES),
        data: { scrollToTop: true },
      },
    ],
  },
];
