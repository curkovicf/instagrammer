import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { UserRepository } from './repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ApiCoreModule } from '@instagrammer/api/core';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { EncryptionModule } from '@instagrammer/api/shared/util/encryption';
import { JwtUtilModule } from '@instagrammer/api/auth/util/jwt';

@Module({
  imports: [
    forwardRef(() => ApiCoreModule),
    TypeOrmModule.forFeature([UserRepository, RefreshTokenRepository]),
    EncryptionModule,
    JwtUtilModule,
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class ApiAuthDataAccessModule {}
