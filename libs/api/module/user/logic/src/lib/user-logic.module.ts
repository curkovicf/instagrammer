import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { EncryptionModule } from '@instagrammer/api/shared/util/encryption';
import { ApiCoreConfigModule } from '@instagrammer/api/core/config';
import { RefreshTokenService } from './service/refresh-token.service';

@Module({
  imports: [EncryptionModule, ApiCoreConfigModule],
  providers: [UserService, RefreshTokenService],
})
export class UserLogicModule {}
