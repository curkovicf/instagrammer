import { Module } from '@nestjs/common';
import { UserControllerModule } from '@instagrammer/api/module/user/http';
import { EnvironmentModule } from '@instagrammer/api/core/env';
import { TypeormConfigModule } from '@instagrammer/api/core/db';
import { JwtStrategyModule } from '@instagrammer/api/core/jwt/strategy';
import { PostControllerModule } from '@instagrammer/api/module/post/http';

@Module({
  imports: [
    TypeormConfigModule,
    EnvironmentModule,
    JwtStrategyModule,
    UserControllerModule,
    PostControllerModule,
  ],
})
export class ApiShellModule {}
