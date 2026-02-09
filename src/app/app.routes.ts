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
    data: { scrollToTop: true },
    children: [
      {
        path: '',
        component: HomeShopTab,
        children: [
          { path: '', component: HangerTabView },
          { path: 'hangers', component: HangerTabView },
          { path: 'mannequins', component: MannequinTabView },
        ],
      },
    ],
  },
  {
    path: 'shop',
    component: TheShop, // This will be rendered in app.component's router-outlet // This will contain your tab component
    data: { scrollToTop: true },
    children: [
      { path: '', component: HangerShopTabView },
      { path: 'hangers', component: HangerShopTabView },
      { path: 'mannequins', component: MannequinShopTabView },
    ],
  },
  {
    path: 'about',
    component: AboutUs, // This will be rendered in app.component's router-outlet
    data: { scrollToTop: true },
  },
  {
    path: 'contact',
    component: ContactUs, // This will be rendered in app.component's router-outlet
    data: { scrollToTop: true },
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicy, // This will be rendered in app.component's router-outlet
    data: { scrollToTop: true },
  },
  {
    path: 'terms-and-conditions',
    component: TermsAndConditions, // This will be rendered in app.component's router-outlet
    data: { scrollToTop: true },
  },
  { path: '**', redirectTo: '' }, // fallback
];
