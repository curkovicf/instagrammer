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
  public generateAuthTokenPair(isLongSession = false): {
    accessToken: string;
    refreshToken: string;
  } {
    const refreshTokenSignOptions = isLongSession
      ? this.refreshTokenLongSignOptions
      : this.refreshTokenShortSignOptions;

    console.log(refreshTokenSignOptions, refreshTokenSignOptions.secret);

    return {
      accessToken: this.jwtService.sign(this.accessTokenSignOptions),
      refreshToken: this.jwtService.sign(refreshTokenSignOptions),
    };
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
}
