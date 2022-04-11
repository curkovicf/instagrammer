import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthFacadeService } from '@instagrammer/web/auth/data-access';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router, private readonly authFacadeService: AuthFacadeService) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
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
