import { Injectable } from '@angular/core';
import { finalize, first, map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthFacadeService } from './store/auth-facade.service';
import { JwtStorageService } from './jwt-storage.service';
import { AuthApi, UserApi } from '@instagrammer/shared/data/api';
import { AuthApiService } from '@instagrammer/web/shared/data/api';

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

  public signIn(credentials: AuthApi.SignInDto): Observable<boolean> {
    return this.authApiService.signIn(credentials).pipe(
      map(loginResponseDto => {
        if (!loginResponseDto) {
          return false;
        }

        return this.handleSuccessfulLogin(loginResponseDto);
      }),
    );
  }

  public signUp(registerDto: AuthApi.SignUpDto): Observable<boolean> {
    return this.authApiService.signUp(registerDto).pipe(
      map(loginResponseDto => {
        if (!loginResponseDto) {
          return false;
        }

        return this.handleSuccessfulLogin(loginResponseDto);
      }),
    );
  }

  private handleSuccessfulLogin(loginResponseDto: UserApi.LoginResponseDto): boolean {
    this.authFacadeService.updateAuthState(loginResponseDto);
    this.jwtStorageService.saveAuthState(loginResponseDto);

    this.router.navigate(['/auth/onetap']);

    return true;
  }

  public logout(): void {
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
        tap(jwtTokenDto => {
          // const loginResponseDto: UserApi.LoginResponseDto = {
          //   ...jwtTokenDto,
          //   jwt: jwtTokenDto.value,
          //   username: this.jwtStorageService.getUsername(),
          // };

          this.authFacadeService.disableOneTapRouter();
          // this.authFacadeService.updateAuthState(loginResponseDto);
          // this.jwtStorageService.saveAuthState(loginResponseDto);
        }),
        finalize(() => this.router.navigate([''])),
      )
      .subscribe();
  }
}
