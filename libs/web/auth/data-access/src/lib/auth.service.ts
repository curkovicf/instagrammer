import { Injectable } from '@angular/core';
import { finalize, map, Observable, take, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthApiService } from './api/auth-api.service';
import { AuthFacadeService } from './store/auth-facade.service';
import { JwtStorageService } from './jwt-storage.service';
import { LoginDto, RefreshJwtDto, RegisterDto } from '@instagrammer/api/auth/data-access';
import { JwtResponseDto } from '@instagrammer/shared/data-access/api-dtos';

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

  public login(credentials: LoginDto): Observable<boolean> {
    return this.authApiService.login(credentials).pipe(
      map(loginResponseDto => {
        if (!loginResponseDto) {
          return false;
        }

        return this.handleSuccessfulLogin(loginResponseDto);
      }),
    );
  }

  public register(registerDto: RegisterDto): Observable<boolean> {
    return this.authApiService.register(registerDto).pipe(
      map(registerResponseDto => {
        if (!registerResponseDto) {
          return false;
        }

        return this.handleSuccessfulLogin(registerResponseDto);
      }),
    );
  }

  private handleSuccessfulLogin(loginResponseDto: JwtResponseDto): boolean {
    this.authFacadeService.updateAuthState(loginResponseDto);
    this.jwtStorageService.saveAuthState(loginResponseDto);

    this.router.navigate(['/auth/onetap']);

    return true;
  }

  public logout(): void {
    this.authFacadeService.logout();
    this.jwtStorageService.clearStorage();
    this.router.navigate(['/auth/login']);
  }

  public saveLoginInfo(): void {
    const refreshJwtDto: RefreshJwtDto = {
      username: 'user123',
      isLongSession: true,
    };

    this.authApiService
      .saveLoginInfo(refreshJwtDto)
      .pipe(
        take(1),
        tap(loginResponseDto => {
          this.authFacadeService.updateAuthState(loginResponseDto);
          this.jwtStorageService.saveAuthState(loginResponseDto);
        }),
        finalize(() => this.router.navigate(['/dummy-home'])),
      )
      .subscribe();
  }
}
