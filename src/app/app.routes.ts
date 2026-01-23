import { Routes } from '@angular/router';
import { TheTab } from './the-tab/the-tab';
import { App } from './app';
import { HangerTabView } from './hanger-tab-view/hanger-tab-view';
import { MannequinTabView } from './mannequin-tab-view/mannequin-tab-view';
import { WhyStrip } from './why-strip/why-strip';

export const routes: Routes = [
    // {
    //   path: '',
    //   component: App, // Homepage component
    // },
  {
    path: '',
    component: TheTab,
    children: [
      { path: '', redirectTo: 'hanger', pathMatch: 'full' }, // default tab
      //   { path: '', component: HangerTabView },
      { path: 'hanger', component: HangerTabView },
      { path: 'strip', component: WhyStrip },
      { path: 'mannequin', component: MannequinTabView },
    ],
  },
  { path: '**', redirectTo: '' }, // fallback
];
