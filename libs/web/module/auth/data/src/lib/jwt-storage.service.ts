import { Injectable } from '@angular/core';
import { AuthFacadeService } from './store/auth-facade.service';
import { AUTH_FEATURE_KEY } from './store/auth.reducers';
import { UserApi } from '@instagrammer/shared/data/api';

@Injectable({
  providedIn: 'root',
})
export class JwtStorageService {
  private readonly authKey = AUTH_FEATURE_KEY;

  constructor(private readonly authFacadeService: AuthFacadeService) {}

  private isTokenFromStorageValid(expiresAt: number): boolean {
    return new Date().getTime() < expiresAt;
  }

  public saveAuthState(loginResponseDto: UserApi.LoginResponseDto): void {
    localStorage.setItem(this.authKey, JSON.stringify(loginResponseDto));
  }

  public clearStorage(): void {
    localStorage.removeItem(this.authKey);
  }

  public getUsername(): string {
    const authState = localStorage.getItem(this.authKey);

    if (!authState) {
      throw new Error('Auth state is missing in local storage');
    }

    const parsedAuthState: UserApi.LoginResponseDto = JSON.parse(authState);

    return parsedAuthState.username;
  }
}
