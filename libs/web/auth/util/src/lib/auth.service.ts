import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LoginRequestDto } from '@instagrammer/shared/data-access/api-dtos';
import { Router } from '@angular/router';
import { AuthApiService, AuthFacadeService } from '@instagrammer/web/auth/data-access';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly router: Router,
    private readonly authApiService: AuthApiService,
    private readonly authFacadeService: AuthFacadeService,
  ) {}

  public login(credentials: LoginRequestDto): Observable<boolean> {
    return this.authApiService.login(credentials).pipe(
      map((loginResponseDto?) => {
        if (!loginResponseDto) {
          return false;
        }

        this.authFacadeService.updateAuthState(loginResponseDto);

        this.router.navigate(['/dummy-home']);

        return true;
      }),
    );
  }
}
