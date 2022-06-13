import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthFacadeService } from '@instagrammer/web/auth/data-access';
import { map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OneTapGuard implements CanActivate {
  constructor(private readonly router: Router, private readonly authFacadeService: AuthFacadeService) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.authFacadeService.isOneTapRouterEnabled$.pipe(
      take(1),
      map(isOneTapRouterEnabled => {
        if (isOneTapRouterEnabled) {
          return true;
        }

        return this.router.createUrlTree(['/auth/login']);
      }),
    );
  }
}
