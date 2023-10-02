import { PassportJwtStrategyService } from './service/passport-jwt-strategy.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentVariable } from '@instagrammer/api/core/env';
import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { accessTokenExpiresProvider } from './token/access-token.provider';
import { refreshTokenShortExpiresProvider } from './token/refresh-token-short.provider';
import { refreshTokenLongExpiresProvider } from './token/refresh-token-long.provider';

@Global()
@Module({
  imports: [
    PassportModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(EnvironmentVariable.PASSPORT_SECRET),
        strategy: configService.get(EnvironmentVariable.PASSPORT_STRATEGY),
        defaultStrategy: configService.get(EnvironmentVariable.PASSPORT_DEFAULT_STRATEGY),
      }),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(EnvironmentVariable.PASSPORT_SECRET),
        signOptions: {
          expiresIn: configService.get(EnvironmentVariable.PASSPORT_TOKEN_EXPIRES),
        },
      }),
    }),
  ],
  providers: [
    PassportJwtStrategyService,
    accessTokenExpiresProvider,
    refreshTokenShortExpiresProvider,
    refreshTokenLongExpiresProvider,
  ],
})
export class ApiModuleAuthLogicModule {}
