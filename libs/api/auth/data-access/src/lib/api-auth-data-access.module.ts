import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { UserRepository } from './repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ApiCoreModule } from '@instagrammer/api/core';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { JwtUtilService } from './jwt/jwt-util.service';
import { EncryptionModule } from '@instagrammer/api/shared/util/encryption';

@Module({
  imports: [
    forwardRef(() => ApiCoreModule),
    TypeOrmModule.forFeature([UserRepository, RefreshTokenRepository]),
    EncryptionModule,
  ],
  providers: [AuthService, JwtUtilService],
  exports: [AuthService],
})
export class ApiAuthDataAccessModule {}
