/*  How to redirect to the child route  */
// https://stackoverflow.com/questions/42874859/angular-2-routing-redirect-to-with-child-routes

import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const shellRoutes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'auth',
        // eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
        loadChildren: async () => (await import('@instagrammer/web/auth/feature/shell')).WebAuthShellModule,
      },
    ],
  },
];
