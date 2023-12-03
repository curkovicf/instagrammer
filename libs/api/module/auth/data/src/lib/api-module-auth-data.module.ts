import { AccountRepository } from './repository/account.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './entity/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  providers: [AccountRepository],
  exports: [AccountRepository],
})
export class ApiModuleAuthDataModule {}
