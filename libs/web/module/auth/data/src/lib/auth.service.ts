import { Injectable } from '@angular/core';
import { finalize, map, Observable, take, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthFacadeService } from './store/auth-facade.service';
import { JwtStorageService } from './jwt-storage.service';
import { UserApi } from '@instagrammer/shared/data/api';
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

  public login(credentials: UserApi.LoginRequestDto): Observable<boolean> {
    return this.authApiService.signIn(credentials).pipe(
      map(loginResponseDto => {
        if (!loginResponseDto) {
          return false;
        }

        return this.handleSuccessfulLogin(loginResponseDto);
      }),
    );
  }

  public register(registerDto: UserApi.RegisterRequestDto): Observable<boolean> {
    return this.authApiService.signUp(registerDto).pipe(
      map(registerResponseDto => {
        if (!registerResponseDto) {
          return false;
        }

        return this.handleSuccessfulLogin(registerResponseDto);
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
      .signOut({ usernameOrEmail: this.jwtStorageService.getUsername() })
      .pipe(
        take(1),
        finalize(() => {
          this.authFacadeService.logout();
          this.jwtStorageService.clearStorage();
          this.router.navigate(['/auth/login']);
        }),
      )
      .subscribe();
  }

  public saveLogin(refreshJwtDto: UserApi.RefreshJwtRequestDto): void {
    this.authApiService
      .saveLoginInfo()
      .pipe(
        take(1),
        tap(jwtTokenDto => {
          const loginResponseDto: UserApi.LoginResponseDto = {
            ...jwtTokenDto,
            jwt: jwtTokenDto.value,
            username: this.jwtStorageService.getUsername(),
          };

          this.authFacadeService.disableOneTapRouter();
          this.authFacadeService.updateAuthState(loginResponseDto);
          this.jwtStorageService.saveAuthState(loginResponseDto);
        }),
        finalize(() => this.router.navigate([''])),
      )
      .subscribe();
  }

  public getAccessToken(): void {
    this.authApiService
      .getAccessJwt()
      .pipe(
        take(1),
        tap((loginResponseDto: UserApi.LoginResponseDto) => {
          if (!loginResponseDto) {
            return;
          }

          this.authFacadeService.updateAuthState(loginResponseDto);
          this.jwtStorageService.saveAuthState(loginResponseDto);
          this.router.navigate(['']);
        }),
      )
      .subscribe();
  }
}
