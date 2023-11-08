import { Module } from '@nestjs/common';
import { EnvironmentModule } from '@instagrammer/api/core/environment';
import { TypeormConfigModule } from '@instagrammer/api/core/database';
import { AuthControllerModule } from '@instagrammer/api/module/auth/http';

@Module({
  imports: [TypeormConfigModule, EnvironmentModule, AuthControllerModule],
})
export class ApiShellModule {}
