import { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/the-home/the-home')
        .then((m) => m.TheHome),
    data: { scrollToTop: true },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home-shop-tab/home-shop-tab')
            .then((m) => m.HomeShopTab),
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/hanger-tab-view/hanger-tab-view')
                .then((m) => m.HangerTabView),
          },
          {
            path: 'hangers',
            loadComponent: () =>
              import('./pages/hanger-tab-view/hanger-tab-view')
                .then((m) => m.HangerTabView),
          },
          {
            path: 'mannequins',
            loadComponent: () =>
              import('./pages/mannequin-tab-view/mannequin-tab-view')
                .then((m) => m.MannequinTabView),
          },
        ],
      },
    ],
  },
];