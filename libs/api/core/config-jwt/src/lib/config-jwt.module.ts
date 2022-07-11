import { PassportModule } from '@nestjs/passport';
import { EnvironmentModule, JWT_OPTIONS_ENV, PASSPORT_ENV } from '@instagrammer/api/shared/config/environment';
import { JwtModule } from '@nestjs/jwt';
import { Global, Module } from '@nestjs/common';
import { JwtStrategyService } from './strategy/jwt-strategy.service';
import { ConfigDatabaseModule } from '@instagrammer/api-core-config-database';

@Global()
@Module({
  imports: [PassportModule.register(PASSPORT_ENV), JwtModule.register(JWT_OPTIONS_ENV), EnvironmentModule, ConfigDatabaseModule],
  providers: [JwtStrategyService],
  exports: [JwtStrategyService, PassportModule, JwtModule],
})
export class ConfigJwtModule {}
