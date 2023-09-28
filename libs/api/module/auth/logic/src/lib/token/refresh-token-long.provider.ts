// AUTH_REFRESH_TOKEN_LONG_EXPIRES_STRING='60 days'
// AUTH_REFRESH_TOKEN_LONG_EXPIRES_NUMBER=5184000

import { ConfigService } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';
import { EnvironmentVariable } from '@instagrammer/api/core/env';

export const REFRESH_TOKEN_LONG_EXPIRES_STRING = 'REFRESH_TOKEN_LONG_EXPIRES_STRING';

export const refreshTokenLongExpiresStringProvider = {
  provide: REFRESH_TOKEN_LONG_EXPIRES_STRING,
  inject: [ConfigService],
  useFactory: (configService: ConfigService): JwtSignOptions => {
    return {
      secret: configService.get(EnvironmentVariable.PASSPORT_SECRET),
      expiresIn: configService.get(EnvironmentVariable.REFRESH_TOKEN_LONG_EXPIRES_STRING),
    };
  },
};

export const REFRESH_TOKEN_LONG_EXPIRES_NUMBER = 'REFRESH_TOKEN_LONG_EXPIRES_NUMBER';

export const refreshTokenLongExpiresNumberProvider = {
  provide: REFRESH_TOKEN_LONG_EXPIRES_NUMBER,
  inject: [ConfigService],
  useFactory: (configService: ConfigService): JwtSignOptions => {
    return {
      secret: configService.get(EnvironmentVariable.PASSPORT_SECRET),
      expiresIn: configService.get(EnvironmentVariable.REFRESH_TOKEN_LONG_EXPIRES_NUMBER),
    };
  },
};
