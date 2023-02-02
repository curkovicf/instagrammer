import { Injectable } from '@angular/core';
import { finalize, map, Observable, take, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthApiService } from './api/auth-api.service';
import { AuthFacadeService } from './store/auth-facade.service';
import { JwtStorageService } from './jwt-storage.service';
import {
  LoginRequestDto,
  LoginResponseDto,
  RefreshJwtRequestDto,
  RegisterRequestDto,
} from '@instagrammer/shared/data-access/api';

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
      map(loginResponseDto => {
        if (!loginResponseDto) {
          return false;
        }

        return this.handleSuccessfulLogin(loginResponseDto);
      }),
    );
  }

  public register(registerDto: RegisterRequestDto): Observable<boolean> {
    return this.authApiService.register(registerDto).pipe(
      map(registerResponseDto => {
        if (!registerResponseDto) {
          return false;
        }

        return this.handleSuccessfulLogin(registerResponseDto);
      }),
    );
  }

  private handleSuccessfulLogin(loginResponseDto: LoginResponseDto): boolean {
    this.authFacadeService.updateAuthState(loginResponseDto);
    this.jwtStorageService.saveAuthState(loginResponseDto);

    this.router.navigate(['/auth/onetap']);

    return true;
  }

  public logout(): void {
    this.authApiService
      .logout({ usernameOrEmail: this.jwtStorageService.getUsername() })
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

  public saveLogin(refreshJwtDto: RefreshJwtRequestDto): void {
    this.authApiService
      .saveLoginInfo(refreshJwtDto)
      .pipe(
        take(1),
        tap(jwtTokenDto => {
          const loginResponseDto: LoginResponseDto = {
            ...jwtTokenDto,
            jwt: jwtTokenDto.value,
            username: this.jwtStorageService.getUsername(),
          };

          this.authFacadeService.disableOneTapRouter();
          this.authFacadeService.updateAuthState(loginResponseDto);
          this.jwtStorageService.saveAuthState(loginResponseDto);
        }),
        finalize(() => this.router.navigate(['home'])),
      )
      .subscribe();
  }

  public getAccessToken(): void {
    this.authApiService
      .getAccessJwt()
      .pipe(
        take(1),
        tap((loginResponseDto: LoginResponseDto) => {
          if (!loginResponseDto) {
            return;
          }

          this.authFacadeService.updateAuthState(loginResponseDto);
          this.jwtStorageService.saveAuthState(loginResponseDto);
          this.router.navigate(['home']);
        }),
      )
      .subscribe();
  }
}
