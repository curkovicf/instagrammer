import { ConfigService } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';
import { EnvironmentVariable } from '../environment-variable.enum';

export const REFRESH_TOKEN_LONG_EXPIRES_IN_SECONDS = 'REFRESH_TOKEN_LONG_EXPIRES_IN_SECONDS_TOKEN';

export const refreshTokenLongExpiresProvider = {
  provide: REFRESH_TOKEN_LONG_EXPIRES_IN_SECONDS,
  inject: [ConfigService],
  useFactory: (configService: ConfigService): JwtSignOptions => {
    return {
      secret: configService.get(EnvironmentVariable.PASSPORT_SECRET),
      expiresIn: configService.get(EnvironmentVariable.REFRESH_TOKEN_LONG_EXPIRES_IN_SECONDS),
    };
  },
};
