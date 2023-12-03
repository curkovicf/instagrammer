import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envFileValidationSchema } from './env-validation.schema';
import { accessTokenExpiresProvider } from './token/access-token.provider';
import { refreshTokenShortExpiresProvider } from './token/refresh-token-short.provider';
import { refreshTokenLongExpiresProvider } from './token/refresh-token-long.provider';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env['STAGE']}`,
      isGlobal: true,
      validationSchema: envFileValidationSchema,
    }),
  ],
  providers: [accessTokenExpiresProvider, refreshTokenShortExpiresProvider, refreshTokenLongExpiresProvider],
  exports: [accessTokenExpiresProvider, refreshTokenShortExpiresProvider, refreshTokenLongExpiresProvider],
})
export class EnvironmentModule {}
