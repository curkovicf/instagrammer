import { ConfigService } from '@nestjs/config';
import { EnvironmentVariable } from '@instagrammer/api/core/env';
import { JwtSignOptions } from '@nestjs/jwt';

export const ACCESS_TOKEN_EXPIRES_IN_SECONDS = 'ACCESS_TOKEN_EXPIRES_IN_SECONDS_TOKEN';

export const accessTokenExpiresProvider = {
  provide: ACCESS_TOKEN_EXPIRES_IN_SECONDS,
  inject: [ConfigService],
  useFactory: (configService: ConfigService): JwtSignOptions => {
    return {
      secret: configService.get(EnvironmentVariable.PASSPORT_SECRET),
      expiresIn: configService.get(EnvironmentVariable.ACCESS_TOKEN_EXPIRES_IN_SECONDS),
    };
  },
};
