import { Global, Module } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { FollowerRepository } from './repository/follower.repository';

@Global()
@Module({
  providers: [UserRepository, RefreshTokenRepository, FollowerRepository],
  exports: [UserRepository, RefreshTokenRepository, FollowerRepository],
})
export class UserDataModule {}
