import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ApiModuleAuthLogicModule } from '@instagrammer/api/module/auth/logic';
import { CookieService } from '@instagrammer/api/module/auth/util';

@Module({
  imports: [ApiModuleAuthLogicModule],
  providers: [CookieService],
  controllers: [AuthController],
})
export class AuthControllerModule {}
