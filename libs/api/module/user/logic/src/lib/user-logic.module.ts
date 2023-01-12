import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { EncryptionModule } from '@instagrammer/api/shared/util/encryption';
import { RefreshTokenService } from './service/refresh-token.service';
import { JwtUtilModule } from '@instagrammer/api/core/jwt/util';
import { UserDataModule } from '@instagrammer/api/module/user/data';

@Module({
  imports: [EncryptionModule, JwtUtilModule, UserDataModule],
  providers: [UserService, RefreshTokenService],
  exports: [UserService, RefreshTokenService],
})
export class UserLogicModule {}
