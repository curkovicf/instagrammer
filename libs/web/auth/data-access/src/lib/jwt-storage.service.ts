import { Injectable } from '@angular/core';
import {
  AUTH_FEATURE_KEY,
  AuthFacadeService,
} from '@instagrammer/web/auth/data-access';
import { LoginResponseDto } from '@instagrammer/shared/data-access/api-dtos';

@Injectable({
  providedIn: 'root',
})
export class JwtStorageService {
  private readonly authKey = AUTH_FEATURE_KEY;

  constructor(private readonly authFacadeService: AuthFacadeService) {}

  public init(): void {
    const authState = localStorage.getItem(this.authKey);

    if (!authState) {
      return;
    }

    const parsedAuthState: LoginResponseDto = JSON.parse(authState);

    if (!this.isTokenFromStorageValid(parsedAuthState.expiresAt)) {
      this.clearStorage();

      return;
    }

    this.authFacadeService.updateAuthState(parsedAuthState);
  }

  private isTokenFromStorageValid(expiresAt: number): boolean {
    return new Date().getTime() > expiresAt;
  }

  public saveAuthState(loginResponseDto: LoginResponseDto): void {
    localStorage.setItem(this.authKey, JSON.stringify(loginResponseDto));
  }

  public clearStorage(): void {
    localStorage.removeItem(this.authKey);
  }
}
