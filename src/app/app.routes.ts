import { Routes } from '@angular/router';
import { TheTab } from './the-tab/the-tab';
import { App } from './app';
import { HangerTabView } from './hanger-tab-view/hanger-tab-view';
import { MannequinTabView } from './mannequin-tab-view/mannequin-tab-view';
import { WhyStrip } from './why-strip/why-strip';
import { TheShop } from './the-shop/the-shop';
import { TheHome } from './the-home/the-home';
import { AboutUs } from './about-us/about-us';
import { ContactUs } from './contact-us/contact-us';

export const routes: Routes = [
  {
    path: '',
    component: TheHome, // This will contain your tab component
    children: [
      {
        path: '',
        component: TheTab,
        children: [
          { path: '', redirectTo: 'hanger', pathMatch: 'full' },
          { path: '', component: HangerTabView },
          // { path: 'hanger', component: HangerTabView },
          { path: 'mannequin', component: MannequinTabView },
        ],
      },
    ],
  },
  {
    path: 'shop',
    component: TheShop, // This will be rendered in app.component's router-outlet
  },
  {
    path: 'about',
    component: AboutUs, // This will be rendered in app.component's router-outlet
  },
  {
    path: 'contact',
    component: ContactUs, // This will be rendered in app.component's router-outlet
  },
  { path: '**', redirectTo: '' }, // fallback
];
