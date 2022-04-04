import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserEntity } from '@instagrammer/api/auth/data-access';

@Module({
  imports: [
    //  TODO: Move this stuff to env
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'awesome_dev_pass',
      password: 'awesome_dev_pass',
      database: 'instagrammer',
      //  Finds all entities files for you and loads them automatically
      entities: [UserEntity],
      //  Always keep DB schema up to date
      synchronize: true,
    }),
  ],
})
export class TypeormConnConfigModule {}
