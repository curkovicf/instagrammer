import { Module } from '@nestjs/common';
import { TypeormConnConfigModule } from './db/typeorm-conn-config.module';
import { PassportJwtConfigModule } from './jwt/passport-jwt-config.module';
import { EncryptionModule } from '@instagrammer/api/shared/util/encryption';

@Module({
  imports: [TypeormConnConfigModule, PassportJwtConfigModule, EncryptionModule],
  exports: [PassportJwtConfigModule, EncryptionModule],
})
export class ApiCoreModule {}
