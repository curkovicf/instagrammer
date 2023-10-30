import { CommonModule } from '@angular/common';
import { AccountRepository } from './repository/account.repository';
import { Module } from '@nestjs/common';

@Module({
  imports: [CommonModule],
  providers: [AccountRepository],
  exports: [AccountRepository],
})
export class ApiModuleAuthDataModule {}
