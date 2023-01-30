import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { EncryptionModule } from '@instagrammer/api/shared/util/encryption';
import { RefreshTokenService } from './service/refresh-token.service';
import { UserDataModule } from '@instagrammer/api/module/user/data';
import { JwtUtilService } from './service/jwt-util.service';

@Module({
  imports: [EncryptionModule, UserDataModule],
  providers: [UserService, RefreshTokenService, JwtUtilService],
  exports: [UserService, RefreshTokenService],
})
export class UserLogicModule {}
