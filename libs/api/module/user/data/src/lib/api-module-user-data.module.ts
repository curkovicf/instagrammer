import { Module } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';

@Module({
  providers: [UserRepository],
  exports: [UserRepository],
})
export class ApiModuleUserDataModule {}
