import { Module } from '@nestjs/common';
import { TypeormConnConfigModule } from './db/typeorm-conn-config.module';
import { PassportJwtConfigModule } from './jwt/passport-jwt-config.module';

@Module({
  imports: [TypeormConnConfigModule, PassportJwtConfigModule],
  exports: [PassportJwtConfigModule],
})
export class ApiCoreModule {}
