import { Module } from '@nestjs/common';
import { EnvironmentModule } from '@instagrammer/api/core/environment';
import { TypeormConfigModule } from '@instagrammer/api/core/database';
import { AuthControllerModule } from '@instagrammer/api/module/auth/http';
import { ApiModuleUserHttpModule } from 'api/module/user/http';

@Module({
  imports: [EnvironmentModule, TypeormConfigModule, AuthControllerModule, ApiModuleUserHttpModule],
})
export class ApiShellModule {}
