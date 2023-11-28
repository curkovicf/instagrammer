import { Injectable } from '@nestjs/common';
import { EnvironmentVariable } from '@instagrammer/api/core/environment';
import { ConfigService } from '@nestjs/config';

export interface CookieOptions {
  token: string;
  expiresInMillis: number;
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
    const { token, expiresInMillis } = cookieOptions;

    // return `${title}=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${
    //   new Date().getTime() + expiresInMillis
    // }`;

    return `${token}; Path=/; SameSite=Strict; Max-Age=${new Date().getTime() + expiresInMillis}`;
  }

  /**
   * Creates access token cookie
   *
   * @param token
   */
  public createAccessTokenCookie(token: string): string {
    return this.createCookie({
      token,
      expiresInMillis: this.configService.get(EnvironmentVariable.ACCESS_TOKEN_EXPIRES_IN_SECONDS) * 1000,
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
      expiresInMillis: isLongSession
        ? this.configService.get(EnvironmentVariable.REFRESH_TOKEN_LONG_EXPIRES_IN_SECONDS) * 1000
        : this.configService.get(EnvironmentVariable.REFRESH_TOKEN_SHORT_EXPIRES_IN_SECONDS) * 1000,
    });
  }
}
