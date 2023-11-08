import { AccountRepository } from './repository/account.repository';
import { Module } from '@nestjs/common';

@Module({
  providers: [AccountRepository],
  exports: [AccountRepository],
})
export class ApiModuleAuthDataModule {}
