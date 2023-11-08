import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentVariable } from '@instagrammer/api/core/environment';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get(EnvironmentVariable.POSTGRES_HOST),
        port: configService.get(EnvironmentVariable.POSTGRES_PORT),
        username: configService.get(EnvironmentVariable.POSTGRES_USER),
        password: configService.get(EnvironmentVariable.POSTGRES_PASSWORD),
        database: configService.get(EnvironmentVariable.POSTGRES_DB_NAME),
        synchronize: true,
        entities: [
          // UserEntity,
          // RefreshTokenEntity,
          // FollowerEntity,
          // AccountSettingsEntity,
          // CommentEntity,
          // PhotoEntity,
          // PostEntity,
          // AccountEntity,
        ],
      }),
    }),
  ],
})
export class TypeormConfigModule {}
