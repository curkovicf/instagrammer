import { Global, Module } from '@nestjs/common';
import { JwtAuthService } from './service/jwt-auth.service';
import { EncryptionModule } from '@instagrammer/api/shared/util/encryption';
import { JwtModule } from '@nestjs/jwt';
import { ApiModuleAuthDataModule } from '@instagrammer/api/module/auth/data';
import { AuthService } from './service/auth.service';
import { ApiModuleUserDataModule } from '@instagrammer/api/module/user/data';

@Global()
@Module({
  imports: [EncryptionModule, JwtModule, ApiModuleAuthDataModule, ApiModuleUserDataModule],
  providers: [AuthService, JwtAuthService],
  exports: [AuthService, JwtAuthService],
})
export class ApiModuleAuthLogicModule {}
