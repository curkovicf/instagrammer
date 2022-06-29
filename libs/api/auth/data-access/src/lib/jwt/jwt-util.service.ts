import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getJwtExpiryInMilliseconds, JwtExpiresStr } from './constants';
import { JwtTokenDto, TokenPairDto } from '../dto/token-pair.dto';
import { JwtPayload } from '@instagrammer/api/shared/data-access/interfaces';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtUtilService {
  constructor(private readonly jwtService: JwtService) {}

  public generateToken(username: string, jwtExpiresStr: JwtExpiresStr): JwtTokenDto {
    return {
      value: this.createJwt(username, jwtExpiresStr),
      expiresAt: new Date().getTime() + getJwtExpiryInMilliseconds(jwtExpiresStr),
      issuedAt: new Date().getTime(),
    };
  }

  public generateTokenPair(username: string, isLongSession: boolean): TokenPairDto {
    const accessToken: JwtTokenDto = this.generateToken(username, JwtExpiresStr.ACCESS_JWT);

    const refreshTokenExpires = isLongSession ? JwtExpiresStr.REFRESH_JWT_EXPIRES_LONG : JwtExpiresStr.REFRESH_JWT_EXPIRES_SHORT;
    const refreshToken: JwtTokenDto = this.generateToken(username, refreshTokenExpires);

    return {
      accessToken,
      refreshToken,
    };
  }

  public createJwt(username: string, jwtExpires: JwtExpiresStr): string {
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
}
