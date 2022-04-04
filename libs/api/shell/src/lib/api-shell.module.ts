import { Module } from '@nestjs/common';
import { ApiCoreModule } from '@instagrammer/api/core';
import { ApiAuthFeatureModule } from '@instagrammer/api/auth/feature';

@Module({
  imports: [ApiCoreModule, ApiAuthFeatureModule],
  exports: [ApiCoreModule, ApiAuthFeatureModule],
})
export class ApiShellModule {}
