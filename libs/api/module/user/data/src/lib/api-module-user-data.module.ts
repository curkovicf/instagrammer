import { Module } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class ApiModuleUserDataModule {}
