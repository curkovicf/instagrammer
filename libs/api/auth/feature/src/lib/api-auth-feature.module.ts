import { Module } from '@nestjs/common';
import { ApiAuthDataAccessModule } from '@instagrammer/api/auth/data-access';
import { AuthController } from './controller/auth.controller';

@Module({
  imports: [ApiAuthDataAccessModule],
  controllers: [AuthController],
})
export class ApiAuthFeatureModule {}
