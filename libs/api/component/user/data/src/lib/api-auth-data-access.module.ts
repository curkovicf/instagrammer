import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserRepository } from './repository/user.repository';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { EncryptionModule } from '@instagrammer/api/shared/util/encryption';
import { ApiCoreConfigModule } from '@instagrammer/api/core/config';

@Module({
  // imports: [PassportModule.register(PASSPORT_ENV), JwtModule.register(JWT_OPTIONS_ENV), EncryptionModule],
  imports: [EncryptionModule, ApiCoreConfigModule],
  providers: [UserService, RefreshTokenRepository, UserRepository],
  exports: [UserService],
})
export class ApiAuthDataAccessModule {}
