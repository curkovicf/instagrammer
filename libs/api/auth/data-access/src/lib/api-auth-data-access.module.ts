import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { UserRepository } from './repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { EncryptionModule } from '@instagrammer/api/shared/util/encryption';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategyService } from './jwt/strategy/jwt-strategy.service';
import { EnvironmentModule, JWT_OPTIONS_ENV, PASSPORT_ENV } from '@instagrammer/api/core/config-environment';
import { JwtUtilService } from './jwt/util/jwt-util.service';

@Module({
  imports: [
    PassportModule.register(PASSPORT_ENV),
    JwtModule.register(JWT_OPTIONS_ENV),
    TypeOrmModule.forFeature([UserRepository, RefreshTokenRepository]),
    EncryptionModule,
    EnvironmentModule,
  ],
  providers: [AuthService, JwtStrategyService, JwtUtilService],
  exports: [AuthService],
})
export class ApiAuthDataAccessModule {}
