import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtExpires } from './jwt-expires.enum';
import { JwtDto, JwtPairDto } from '@instagrammer/shared-data-access-api-auth-dto';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from '../jwt-payload.interface';

@Injectable()
export class JwtUtilService {
  constructor(private readonly jwtService: JwtService) {}

  public generateToken(username: string, jwtExpiresStr: JwtExpires): JwtDto {
    return {
      value: this.createJwt(username, jwtExpiresStr),
      expiresAt: new Date().getTime() + this.getJwtExpiryInMilliseconds(jwtExpiresStr),
      issuedAt: new Date().getTime(),
    };
  }

  public generateTokenPair(username: string, isLongSession: boolean): JwtPairDto {
    const accessToken: JwtDto = this.generateToken(username, JwtExpires.ACCESS_JWT);

    const refreshTokenExpires = isLongSession ? JwtExpires.REFRESH_JWT_EXPIRES_LONG : JwtExpires.REFRESH_JWT_EXPIRES_SHORT;
    const refreshToken: JwtDto = this.generateToken(username, refreshTokenExpires);

    return {
      accessToken,
      refreshToken,
    };
  }

  public createJwt(username: string, jwtExpires: JwtExpires): string {
    const payload: JwtPayload = { username };

    return this.jwtService.sign(payload, { expiresIn: jwtExpires });
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
