import { Inject, Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import {
  ACCESS_TOKEN_EXPIRES_IN_SECONDS,
  REFRESH_TOKEN_LONG_EXPIRES_IN_SECONDS,
  REFRESH_TOKEN_SHORT_EXPIRES_IN_SECONDS,
} from '@instagrammer/api/core/environment';

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(ACCESS_TOKEN_EXPIRES_IN_SECONDS)
    private readonly accessTokenSignOptions: JwtSignOptions,
    @Inject(REFRESH_TOKEN_SHORT_EXPIRES_IN_SECONDS)
    private readonly refreshTokenShortSignOptions: JwtSignOptions,
    @Inject(REFRESH_TOKEN_LONG_EXPIRES_IN_SECONDS)
    private readonly refreshTokenLongSignOptions: JwtSignOptions,
  ) {}

  /**
   *
   */
  public generateAuthTokenPair(
    isLongSession: boolean | undefined,
    username: string,
  ): { accessToken: string; refreshToken: string } {
    const refreshTokenSignOptions = isLongSession
      ? this.refreshTokenLongSignOptions
      : this.refreshTokenShortSignOptions;

    return {
      accessToken: this.jwtService.sign({ username }, this.accessTokenSignOptions),
      refreshToken: this.jwtService.sign({ username }, refreshTokenSignOptions),
    };
  }

  /**
   * Generate access token
   *
   * @param username
   */
  public generateAccessToken(username: string): string {
    return this.jwtService.sign({ username }, this.accessTokenSignOptions);
  }

  /**
   * Decodes JWT token
   *
   * @param token
   * @param options
   */
  public decode(
    token: string,
    options?: jwt.DecodeOptions,
  ):
    | null
    | {
        [key: string]: any;
      }
    | string {
    return this.jwtService.decode(token, options);
  }

  /**
   * Checks if the refresh token is valid, it can be either long or short session
   *
   * @param refreshToken
   */
  public isValid(refreshToken: string):
    | null
    | {
        [key: string]: any;
      }
    | string {
    const isLongSession = this.jwtService.verify(refreshToken, this.refreshTokenLongSignOptions);
    const isShortSession = this.jwtService.verify(refreshToken, this.refreshTokenShortSignOptions);

    if (isShortSession || isLongSession) {
      return this.decode(refreshToken);
    }

    return null;
  }
}
