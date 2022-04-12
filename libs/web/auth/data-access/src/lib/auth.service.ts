import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LoginRequestDto } from '@instagrammer/shared/data-access/api-dtos';
import { Router } from '@angular/router';
import { AuthApiService } from './api/auth-api.service';
import { AuthFacadeService } from './store/auth-facade.service';
import { JwtStorageService } from './jwt-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly router: Router,
    private readonly authApiService: AuthApiService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly jwtStorageService: JwtStorageService,
  ) {}

  public login(credentials: LoginRequestDto): Observable<boolean> {
    return this.authApiService.login(credentials).pipe(
      map((loginResponseDto?) => {
        if (!loginResponseDto) {
          return false;
        }

        this.authFacadeService.updateAuthState(loginResponseDto);
        this.jwtStorageService.saveAuthState(loginResponseDto);

        this.router.navigate(['/dummy-home']);

        return true;
      }),
    );
  }

  public logout(): void {
    this.authFacadeService.logout();
    this.jwtStorageService.clearStorage();
    this.router.navigate(['/auth/login']);
  }
}
