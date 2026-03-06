import { Routes } from '@angular/router';

export const CONTACT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/contact-us/contact-us').then((m) => m.ContactUs),
  },
];
