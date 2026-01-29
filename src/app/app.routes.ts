import { Routes } from '@angular/router';
import { HomeShopTab } from './home-shop-tab/home-shop-tab';
import { App } from './app';
import { HangerTabView } from './hanger-tab-view/hanger-tab-view';
import { MannequinTabView } from './mannequin-tab-view/mannequin-tab-view';
import { WhyStrip } from './why-strip/why-strip';
import { TheShop } from './the-shop/the-shop';
import { TheHome } from './the-home/the-home';
import { AboutUs } from './about-us/about-us';
import { ContactUs } from './contact-us/contact-us';
import { HangerShopTabView } from './hanger-shop-tab-view/hanger-shop-tab-view';
import { MannequinShopTabView } from './mannequin-shop-tab-view/mannequin-shop-tab-view';
import { PrivacyPolicy } from './privacy-policy/privacy-policy';
import { TermsAndConditions } from './terms-and-conditions/terms-and-conditions';

export const routes: Routes = [
  {
    path: '',
    component: TheHome, // This will contain your tab component
    children: [
      {
        path: '',
        component: HomeShopTab,
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
    component: TheShop, // This will be rendered in app.component's router-outlet // This will contain your tab component
    children: [
      // { path: '', redirectTo: '', pathMatch: 'full' },
      { path: '', component: HangerShopTabView },
      // { path: 'hanger', component: HangerShopTabView },
      { path: 'mannequin', component: MannequinShopTabView },
    ],
  },
  {
    path: 'about',
    component: AboutUs, // This will be rendered in app.component's router-outlet
  },
  {
    path: 'contact',
    component: ContactUs, // This will be rendered in app.component's router-outlet
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicy, // This will be rendered in app.component's router-outlet
  },
  {
    path: 'terms-and-conditions',
    component: TermsAndConditions, // This will be rendered in app.component's router-outlet
  },
  { path: '**', redirectTo: '' }, // fallback
];
