import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenEntity, UserEntity } from '@instagrammer/api/auth/data-access';
import { TYPEORM_ENV } from '@instagrammer/api/core/config-environment';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...TYPEORM_ENV,
      //  Finds all entities files for you and loads them automatically
      entities: [UserEntity, RefreshTokenEntity],
    }),
  ],
})
export class ConfigDatabaseModule {}
