import { Module } from '@nestjs/common';
import { UserControllerModule } from '@instagrammer/api/module/user/http';
import { EnvironmentModule } from '@instagrammer/api/core/env';
import { TypeormConfigModule } from '@instagrammer/api/core/db';
import { JwtUtilModule } from '@instagrammer/api/core/jwt/util';
import { JwtStrategyModule } from '@instagrammer/api/core/jwt/strategy';

@Module({
  imports: [TypeormConfigModule, EnvironmentModule, JwtUtilModule, JwtStrategyModule, UserControllerModule],
})
export class ApiShellModule {}
