import { Injectable } from '@nestjs/common';
import { EnvironmentVariable } from '@instagrammer/api/core/environment';
import { ConfigService } from '@nestjs/config';

export interface CookieOptions {
  token: string;
  expiresInSeconds: number;
}

@Injectable()
export class CookieService {
  public readonly ACCESS_TOKEN_KEY = 'Access-Token';
  public readonly REFRESH_TOKEN_KEY = 'Refresh-Token';

  constructor(private readonly configService: ConfigService) {}

  /**
   * Creates new HTTP header cookie
   *
   * @param cookieOptions
   */
  public createCookie(cookieOptions: CookieOptions): string {
    const { token, expiresInSeconds } = cookieOptions;

    return `${token}; Path=/; SameSite=Strict; Path=/; HttpOnly; SameSite=Strict; Secure; Max-Age=${expiresInSeconds}`;
  }

  /**
   * Creates access token cookie
   *
   * @param token
   */
  public createAccessTokenCookie(token: string): string {
    return this.createCookie({
      token,
      expiresInSeconds: Number(this.configService.get(EnvironmentVariable.ACCESS_TOKEN_EXPIRES_IN_SECONDS)),
    });
  }

  /**
   * Creates refresh token cookie
   *
   * @param token
   * @param isLongSession
   */
  public createRefreshTokenCookie(token: string, isLongSession: boolean): string {
    return this.createCookie({
      token,
      expiresInSeconds: isLongSession
        ? Number(this.configService.get(EnvironmentVariable.REFRESH_TOKEN_LONG_EXPIRES_IN_SECONDS))
        : Number(this.configService.get(EnvironmentVariable.REFRESH_TOKEN_SHORT_EXPIRES_IN_SECONDS)),
    });
  }
}
