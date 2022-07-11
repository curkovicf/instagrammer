import { Global, Module } from '@nestjs/common';
import { PASSPORT_ENV, PASSPORT_INJECTION_TOKEN } from './passport/passport-env';
import { TYPEORM_ENV, TYPEORM_INJECTION_TOKEN } from './typeorm/typeorm-env';
import { JWT_OPTIONS_ENV, JWT_OPTIONS_INJECTION_TOKEN } from './jwt/jwt-env';

@Global()
@Module({
  providers: [
    {
      provide: PASSPORT_INJECTION_TOKEN,
      useValue: PASSPORT_ENV,
    },
    {
      provide: TYPEORM_INJECTION_TOKEN,
      useValue: TYPEORM_ENV,
    },
    {
      provide: JWT_OPTIONS_INJECTION_TOKEN,
      useValue: JWT_OPTIONS_ENV,
    },
  ],
  exports: [PASSPORT_INJECTION_TOKEN, TYPEORM_INJECTION_TOKEN, JWT_OPTIONS_INJECTION_TOKEN],
})
export class EnvironmentModule {}
