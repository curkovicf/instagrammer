import { Module } from '@nestjs/common';
// import { EnvironmentModule } from '@instagrammer/api/core/env';
// import { PostControllerModule } from '@instagrammer/api/module/post/http';
// import { ApiModuleAuthLogicModule } from '@instagrammer/api/module/auth/middleware';
import { TypeormConfigModule } from '@instagrammer/api/core/database';

@Module({
  imports: [TypeormConfigModule],
})
export class ApiShellModule {}
