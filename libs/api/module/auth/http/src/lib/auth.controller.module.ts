import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ApiModuleAuthLogicModule } from '@instagrammer/api/module/auth/logic';

@Module({
  imports: [ApiModuleAuthLogicModule],
  controllers: [AuthController],
})
export class AuthControllerModule {}
