import { ConfigService } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';
import { EnvironmentVariable } from '@instagrammer/api/core/env';

export const REFRESH_TOKEN_SHORT_EXPIRES_IN_SECONDS = 'REFRESH_TOKEN_SHORT_EXPIRES_IN_SECONDS_TOKEN';

export const refreshTokenShortExpiresProvider = {
  provide: REFRESH_TOKEN_SHORT_EXPIRES_IN_SECONDS,
  inject: [ConfigService],
  useFactory: (configService: ConfigService): JwtSignOptions => {
    return {
      secret: configService.get(EnvironmentVariable.PASSPORT_SECRET),
      expiresIn: configService.get(EnvironmentVariable.REFRESH_TOKEN_SHORT_EXPIRES_IN_SECONDS),
    };
  },
};
