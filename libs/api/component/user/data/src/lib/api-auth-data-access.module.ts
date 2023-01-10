import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserRepository } from './repository/user.repository';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { EncryptionModule } from '@instagrammer/api/shared/util/encryption';
import { JwtUtilService } from './jwt/util/jwt-util.service';

@Module({
  // imports: [PassportModule.register(PASSPORT_ENV), JwtModule.register(JWT_OPTIONS_ENV), EncryptionModule],
  imports: [EncryptionModule],
  providers: [UserService, JwtUtilService, RefreshTokenRepository, UserRepository],
  exports: [UserService],
})
export class ApiAuthDataAccessModule {}
