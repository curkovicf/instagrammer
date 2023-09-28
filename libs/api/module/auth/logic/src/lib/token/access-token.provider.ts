// AUTH_ACCESS_TOKEN_EXPIRES_STRING='5m'
// AUTH_ACCESS_TOKEN_EXPIRES_NUMBER=300

import { ConfigService } from '@nestjs/config';
import { EnvironmentVariable } from '@instagrammer/api/core/env';
import { JwtSignOptions } from '@nestjs/jwt';

export const ACCESS_TOKEN_EXPIRES_STRING = 'ACCESS_TOKEN_EXPIRES_STRING';

export const accessTokenExpiresStringProvider = {
  provide: ACCESS_TOKEN_EXPIRES_STRING,
  inject: [ConfigService],
  useFactory: (configService: ConfigService): JwtSignOptions => {
    return {
      secret: configService.get(EnvironmentVariable.PASSPORT_SECRET),
      expiresIn: configService.get(EnvironmentVariable.ACCESS_TOKEN_EXPIRES_STRING),
    };
  },
};

export const ACCESS_TOKEN_EXPIRES_NUMBER = 'ACCESS_TOKEN_EXPIRES_NUMBER';

export const accessTokenExpiresNumberProvider = {
  provide: ACCESS_TOKEN_EXPIRES_NUMBER,
  inject: [ConfigService],
  useFactory: (configService: ConfigService): JwtSignOptions => {
    return {
      secret: configService.get(EnvironmentVariable.PASSPORT_SECRET),
      expiresIn: configService.get(EnvironmentVariable.ACCESS_TOKEN_EXPIRES_NUMBER),
    };
  },
};
