import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { UserRepository } from './repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ApiCoreModule } from '@instagrammer/api/core';
import { RefreshTokenRepository } from './repository/refresh-token.repository';

@Module({
  imports: [forwardRef(() => ApiCoreModule), TypeOrmModule.forFeature([UserRepository, RefreshTokenRepository])],
  providers: [AuthService],
  exports: [AuthService],
})
export class ApiAuthDataAccessModule {}
