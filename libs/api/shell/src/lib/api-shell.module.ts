import { Module } from '@nestjs/common';
import { EnvironmentModule } from '@instagrammer/api/core/environment';
import { TypeormConfigModule } from '@instagrammer/api/core/database';
import { AuthControllerModule } from '@instagrammer/api/module/auth/http';
import { ApiModuleUserHttpModule } from 'api/module/user/http';
import { PostControllerModule } from '@instagrammer/api/module/post/http';
import { ApiModuleAuthMiddlewareModule } from '@instagrammer/api/module/auth/middleware';

@Module({
  imports: [
    ApiModuleAuthMiddlewareModule,
    EnvironmentModule,
    TypeormConfigModule,
    AuthControllerModule,
    ApiModuleUserHttpModule,
    PostControllerModule,
  ],
})
export class ApiShellModule {}
