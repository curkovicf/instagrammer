import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtExpires } from '../interface/jwt-expires.enum';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from '@instagrammer/api/shared/data';
import { UserApi } from '@instagrammer/shared/data/api';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariable } from '@instagrammer/api/core/env';

@Injectable()
export class JwtUtilService {
  constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {}

  public generateToken(username: string, jwtExpiresStr: JwtExpires): UserApi.JwtDto {
    return {
      value: this.createJwt(username, jwtExpiresStr),
      expiresAt: new Date().getTime() + this.getJwtExpiryInMilliseconds(jwtExpiresStr),
      issuedAt: new Date().getTime(),
    };
  }

  public generateTokenPair(username: string, isLongSession: boolean): UserApi.JwtPairDto {
    const accessToken: UserApi.JwtDto = this.generateToken(username, JwtExpires.ACCESS_JWT);

    const refreshTokenExpires = isLongSession
      ? JwtExpires.REFRESH_JWT_EXPIRES_LONG
      : JwtExpires.REFRESH_JWT_EXPIRES_SHORT;
    const refreshToken: UserApi.JwtDto = this.generateToken(username, refreshTokenExpires);

    return {
      accessToken,
      refreshToken,
    };
  }

  public createJwt(username: string, jwtExpires: JwtExpires): string {
    const payload: JwtPayload = { username };

    return this.jwtService.sign(payload, {
      expiresIn: jwtExpires,
      secret: this.configService.get<string>(EnvironmentVariable.PASSPORT_SECRET),
    });
  }

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

  public getJwtExpiryInMilliseconds(jwtExpiresStr: JwtExpires): number {
    switch (jwtExpiresStr) {
      case JwtExpires.ACCESS_JWT:
        return 300 * 1000;
      case JwtExpires.REFRESH_JWT_EXPIRES_SHORT:
        return 172800 * 1000;
      case JwtExpires.REFRESH_JWT_EXPIRES_LONG:
        return 5184000 * 1000;
    }
  }
}
