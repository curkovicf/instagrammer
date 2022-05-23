import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthApiService } from './api/auth-api.service';
import { AuthFacadeService } from './store/auth-facade.service';
import { JwtStorageService } from './jwt-storage.service';
import { LoginDto, RegisterDto } from '@instagrammer/api/auth/data-access';
import { LoginResponseDto } from '@instagrammer/shared/data-access/api-dtos';

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

  private handleSuccessfulLogin(loginResponseDto: LoginResponseDto): boolean {
    this.authFacadeService.updateAuthState(loginResponseDto);
    this.jwtStorageService.saveAuthState(loginResponseDto);

    if (this.promptToPermanentlySaveLogin()) {

    }

    this.router.navigate(['/dummy-home']);

    return true;
  }

  private promptToPermanentlySaveLogin(): boolean {
    return true;
  }

  public logout(): void {
    this.authFacadeService.logout();
    this.jwtStorageService.clearStorage();
    this.router.navigate(['/auth/login']);
  }
}
