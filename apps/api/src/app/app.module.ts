import { Module } from '@nestjs/common';
import { ApiAuthFeatureModule } from '@instagrammer/api/auth/feature';
import { ApiCoreModule } from '@instagrammer/api/core';

@Module({
  imports: [ApiCoreModule, ApiAuthFeatureModule],
})
export class AppModule {}
