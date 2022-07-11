import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPEORM_ENV } from '@instagrammer/api/shared/config/environment';
import { RefreshTokenEntity, UserEntity } from '@instagrammer/api/auth/data-access';

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
