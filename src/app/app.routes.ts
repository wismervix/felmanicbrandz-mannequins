import { Routes } from '@angular/router';
import { authGuard } from './admin/auth/guard/auth-guard';

export const routes: Routes = [
  {
    path: '',
    data: { scrollToTop: true },
    loadChildren: () =>
      import('./guest/guest.routes').then((m) => m.GUEST_ROUTES),
  },
  {
    path: 'admin/login',
    loadComponent: () =>
      import('./admin/auth/pages/login/login').then((m) => m.Login),
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./admin/admin.routes').then((m) => m.ADMIN_ROUTES),
    data: { scrollToTop: true },
  },
  { path: '**', redirectTo: '' }, // fallback
];
