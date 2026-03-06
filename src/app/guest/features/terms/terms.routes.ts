import { Routes } from '@angular/router';

export const TERMS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/terms-and-conditions/terms-and-conditions').then(
        (m) => m.TermsAndConditions,
      ),
  },
];
