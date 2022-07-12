import { Module } from '@nestjs/common';
import { ApiCoreShellModule } from '@instagrammer/api/core/shell';
import { ApiAuthFeatureModule } from '@instagrammer/api/auth/feature';

@Module({
  imports: [ApiCoreShellModule, ApiAuthFeatureModule],
  exports: [ApiCoreShellModule, ApiAuthFeatureModule],
})
export class ApiShellModule {}
