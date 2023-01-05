import { Module } from '@nestjs/common';
import { TypeormConfigModule } from './db/typeorm-config.module';
import { EnvironmentModule } from './env/environment.module';
import { JwtPassportModule } from './passport/jwt-passport.module';

@Module({
  imports: [TypeormConfigModule, EnvironmentModule, JwtPassportModule],
})
export class ApiCoreConfigModule {}
