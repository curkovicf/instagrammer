/*  How to redirect to the child route  */
// https://stackoverflow.com/questions/42874859/angular-2-routing-redirect-to-with-child-routes

import { Router, Routes } from '@angular/router';
import { NotFoundComponent } from '@instagrammer/web/shared/ui/not-found';
import { inject } from '@angular/core';
import { AuthFacadeService, AuthService } from '@instagrammer/web/module/auth/data';
import { first, map } from 'rxjs';

export const shellRoutes: Routes = [
  {
    path: '',
    canActivate: [
      () => {
        const authFacadeService = inject(AuthFacadeService);
        const router = inject(Router);

        return authFacadeService.authState$.pipe(
          first(),
          map(authState => {
            if (authState.username) {
              return true;
            }

            return router.createUrlTree(['/auth']);
          }),
        );
      },
    ],
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
    canActivate: [() => !inject(AuthService).isAuthDataInLocalStorage()],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
