import { Global, Module } from '@nestjs/common';
import { EncryptionModule } from '@instagrammer/api/shared/util/encryption';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './service/auth.service';
import { JwtAuthService } from './service/jwt-auth.service';
import { ApiModuleAuthDataModule } from '@instagrammer/api/module/auth/data';

@Global()
@Module({
  imports: [EncryptionModule, JwtModule, ApiModuleAuthDataModule],
  providers: [AuthService, JwtAuthService],
  exports: [AuthService, JwtAuthService],
})
export class ApiModuleAuthLogicModule {}
