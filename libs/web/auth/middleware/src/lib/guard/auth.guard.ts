import { map, Observable, take } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthFacadeService } from '@instagrammer/web/auth/data';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router, private readonly authFacadeService: AuthFacadeService) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> {
    return this.authFacadeService.jwtToken$.pipe(
      take(1),
      map(jwtToken => {
        if (jwtToken) {
          return true;
        }

        return this.router.createUrlTree(['/auth']);
      }),
    );
  }
}
