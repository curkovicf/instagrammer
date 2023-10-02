import { Module } from '@nestjs/common';
import { EnvironmentModule } from '@instagrammer/api/core/env';
import { TypeormConfigModule } from '@instagrammer/api/core/db';
import { PostControllerModule } from '@instagrammer/api/module/post/http';
import { ApiModuleAuthLogicModule } from '@instagrammer/api/module/auth/middleware';

@Module({
  imports: [TypeormConfigModule, EnvironmentModule, PostControllerModule, ApiModuleAuthLogicModule],
})
export class ApiShellModule {}
