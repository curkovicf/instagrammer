import { Global, Module } from '@nestjs/common';
import { EncryptionModule } from '@instagrammer/api/shared/util/encryption';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './service/auth.service';
import { RefreshTokenService } from './service/refresh-token.service';
import { JwtUtilService } from './service/jwt-util.service';

@Global()
@Module({
  imports: [EncryptionModule, JwtModule],
  providers: [AuthService, RefreshTokenService, JwtUtilService],
  exports: [AuthService, RefreshTokenService, JwtUtilService],
})
export class ApiModuleAuthLogicModule {}
