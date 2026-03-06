import { Routes } from '@angular/router';

export const ABOUT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/about-us/about-us').then((m) => m.AboutUs),
  },
];
