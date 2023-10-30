import { Global, Module } from '@nestjs/common';
import { EncryptionModule } from '@instagrammer/api/shared/util/encryption';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './service/auth.service';
import { JwtUtilService } from './service/jwt-util.service';
import { ApiModuleAuthDataModule } from '@instagrammer/api/module/auth/data';

@Global()
@Module({
  imports: [EncryptionModule, JwtModule, ApiModuleAuthDataModule],
  providers: [AuthService, JwtUtilService],
  exports: [AuthService, JwtUtilService],
})
export class ApiModuleAuthLogicModule {}
