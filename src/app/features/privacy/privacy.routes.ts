import { Routes } from '@angular/router';

export const PRIVACY_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/privacy-policy/privacy-policy').then((m) => m.PrivacyPolicy),
  },
];
