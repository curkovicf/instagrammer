import { first, map, Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthFacadeService } from '@instagrammer/web/module/auth/data';
import { inject, Injectable } from '@angular/core';

@Injectable()
export class AuthGuard {
  constructor(private readonly router: Router, private readonly authFacadeService: AuthFacadeService) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> {
    return this.authFacadeService.authState$.pipe(
      first(),
      map(authState => {
        if (authState.username) {
          return true;
        }

        return this.router.createUrlTree(['/auth']);
      }),
    );
  }
}

export const authGuard = () => {
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
};
