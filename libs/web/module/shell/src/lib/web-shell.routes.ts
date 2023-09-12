/*  How to redirect to the child route  */
// https://stackoverflow.com/questions/42874859/angular-2-routing-redirect-to-with-child-routes

import { Routes } from '@angular/router';
import { NotFoundComponent } from '@instagrammer/web/shared/ui/not-found';
import { AuthGuard } from '@instagrammer/web/module/auth/middleware';

export const shellRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: async () =>
          (await import('@instagrammer/web/module/home/feature/shell')).WebHomeShellModule,
      },
    ],
  },
  {
    path: 'auth',
    // eslint-disable-next-line @nx/enforce-module-boundaries
    loadChildren: async () =>
      (await import('@instagrammer/web/module/auth/feature/shell')).WebAuthShellModule,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
