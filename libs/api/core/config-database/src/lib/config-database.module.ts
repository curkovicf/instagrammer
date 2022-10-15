import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPEORM_ENV } from '@instagrammer/api/core/config-environment';
import {
  AccountSettingsEntity,
  CommentEntity,
  FollowerEntity,
  PhotoEntity,
  PostEntity,
  RefreshTokenEntity,
  UserEntity,
  UserVerificationEntity,
} from '@instagrammer/api/core/data-access';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...TYPEORM_ENV,
      //  Finds all entities files for you and loads them automatically
      entities: [
        UserEntity,
        RefreshTokenEntity,
        UserVerificationEntity,
        CommentEntity,
        PhotoEntity,
        PostEntity,
        AccountSettingsEntity,
        FollowerEntity,
      ],
    }),
  ],
})
export class ConfigDatabaseModule {}
