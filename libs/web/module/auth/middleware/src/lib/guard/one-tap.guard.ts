import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthFacadeService } from '@instagrammer/web/module/auth/data';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OneTapGuard  {
  constructor(private readonly router: Router, private readonly authFacadeService: AuthFacadeService) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> {
    return this.authFacadeService.isOneTapRouterEnabled$.pipe(
      map(isOneTapRouterEnabled => {
        if (isOneTapRouterEnabled) {
          return true;
        }

        return this.router.createUrlTree(['/auth/login']);
      }),
    );
  }
}
