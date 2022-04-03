import { Module } from '@nestjs/common';
import { ApiConfigModule } from '@instagrammer/api/shared/app-config';
import { ApiAuthFeatureModule } from '@instagrammer/api/auth/feature';

@Module({
  imports: [ApiConfigModule, ApiAuthFeatureModule],
})
export class AppModule {}
