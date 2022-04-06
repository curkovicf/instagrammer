/*  How to redirect to the child route  */
// https://stackoverflow.com/questions/42874859/angular-2-routing-redirect-to-with-child-routes

import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { NotFoundComponent } from '@instagrammer/web/shell/ui/not-found';
import { AuthGuard } from '@instagrammer/web/shell/util';

export const shellRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    // eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
    loadChildren: async () => (await import('@instagrammer/web/auth/feature/shell')).WebAuthShellModule,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
