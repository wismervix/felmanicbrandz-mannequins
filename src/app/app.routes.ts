import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: { scrollToTop: true },
    loadChildren: () =>
      import('./guest/guest.routes').then((m) => m.GUEST_ROUTES),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.routes').then((m) => m.ADMIN_ROUTES),
    data: { scrollToTop: true },
  },
  { path: '**', redirectTo: '' }, // fallback
];
