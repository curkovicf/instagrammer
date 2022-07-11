import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { UserRepository } from './repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigDatabaseModule } from '@instagrammer/api-core-config-database';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { EncryptionModule } from '@instagrammer/api/shared/util/encryption';
import { ConfigJwtModule } from '@instagrammer/api/core/config-jwt';

@Module({
  imports: [
    forwardRef(() => ConfigDatabaseModule),
    TypeOrmModule.forFeature([UserRepository, RefreshTokenRepository]),
    EncryptionModule,
    ConfigJwtModule,
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class ApiAuthDataAccessModule {}
