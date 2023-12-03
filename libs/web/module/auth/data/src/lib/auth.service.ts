import { Injectable } from '@angular/core';
import { catchError, finalize, first, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthFacadeService } from './store/auth-facade.service';
import { JwtStorageService } from './jwt-storage.service';
import { AuthApi, UserApi } from '@instagrammer/shared/data/api';
import { AuthApiService } from '@instagrammer/web/shared/data/api';
import { HttpErrorResponse } from '@angular/common/http';

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

  public authenticateTokens(): void {
    if (!this.isAuthDataInLocalStorage()) {
      return;
    }

    this.authApiService
      .authenticateTokens()
      .pipe(
        first(),
        catchError(error => {
          this.authFacadeService.failedSignIn();

          return of(error);
        }),
        tap((loginResponseDto: AuthApi.SignInResponseDto | HttpErrorResponse) => {
          if (loginResponseDto instanceof HttpErrorResponse) {
            return;
          }

          this.authFacadeService.successSignIn(loginResponseDto);
          this.jwtStorageService.saveAuthState(loginResponseDto);

          this.router.navigate(['/']);
        }),
      )
      .subscribe();
  }

  public isAuthDataInLocalStorage(): boolean {
    try {
      const username = this.jwtStorageService.getUsername();

      if (!username) {
        return false;
      }
    } catch (err) {
      return false;
    }

    return true;
  }

  public signIn(credentials: AuthApi.SignInDto): Observable<boolean> {
    return this.authApiService.signIn(credentials).pipe(
      first(),
      catchError(error => {
        this.authFacadeService.failedSignIn();

        return of(error);
      }),
      map(loginResponseDto => {
        if (loginResponseDto instanceof HttpErrorResponse) {
          return false;
        }

        return this.handleSuccessfulLogin(loginResponseDto);
      }),
    );
  }

  public signUp(registerDto: AuthApi.SignUpDto): Observable<boolean> {
    return this.authApiService.signUp(registerDto).pipe(
      first(),
      catchError(error => {
        this.authFacadeService.failedSignIn();

        return of(error);
      }),
      map(loginResponseDto => {
        if (loginResponseDto instanceof HttpErrorResponse) {
          return false;
        }

        return this.handleSuccessfulLogin(loginResponseDto);
      }),
    );
  }

  private handleSuccessfulLogin(loginResponseDto: UserApi.LoginResponseDto): boolean {
    this.authFacadeService.successSignIn(loginResponseDto);
    this.jwtStorageService.saveAuthState(loginResponseDto);

    this.router.navigate(['/auth/onetap']);

    return true;
  }

  public signOut(): void {
    this.authApiService
      .signOut()
      .pipe(
        first(),
        finalize(() => {
          this.authFacadeService.logout();
          this.jwtStorageService.clearStorage();
          this.router.navigate(['/auth/login']);
        }),
      )
      .subscribe();
  }

  public signInForLongSession(): void {
    this.authApiService
      .saveLoginInfo()
      .pipe(
        first(),
        catchError(error => {
          this.authFacadeService.failedSignIn();

          return of(error);
        }),
        tap(loginResponseDto => {
          if (loginResponseDto instanceof HttpErrorResponse) {
            return;
          }

          console.log('Here ', loginResponseDto);

          this.authFacadeService.disableOneTapRouter();
          this.authFacadeService.successSignIn(loginResponseDto);
        }),
        finalize(() => this.router.navigate([''])),
      )
      .subscribe();
  }
}
