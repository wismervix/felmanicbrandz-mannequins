import { Routes } from '@angular/router';

export const SHOP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/the-shop/the-shop').then((m) => m.TheShop),
    data: { scrollToTop: true },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/all-shop-tab-view/all-shop-tab-view').then(
            (m) => m.AllShopTabView,
          ),
      },
      {
        path: 'all',
        loadComponent: () =>
          import('./pages/all-shop-tab-view/all-shop-tab-view').then(
            (m) => m.AllShopTabView,
          ),
      },
      {
        path: 'hangers',
        loadComponent: () =>
          import('./pages/hanger-shop-tab-view/hanger-shop-tab-view').then(
            (m) => m.HangerShopTabView,
          ),
      },
      {
        path: 'mannequins',
        loadComponent: () =>
          import('./pages/mannequin-shop-tab-view/mannequin-shop-tab-view').then(
            (m) => m.MannequinShopTabView,
          ),
      },
    ],
  },
];
