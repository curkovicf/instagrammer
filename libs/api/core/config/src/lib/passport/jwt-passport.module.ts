import { Module } from '@nestjs/common';
import { JwtStrategyService } from './strategy/passport-jwt-strategy.service';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentVariable } from '../env/environment-variable.enum';
import { JwtModule } from '@nestjs/jwt';
import { JwtUtilService } from './jwt/util/jwt-util.service';

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
  providers: [JwtStrategyService, JwtUtilService],
  exports: [JwtStrategyService, JwtUtilService],
})
export class JwtPassportModule {}
