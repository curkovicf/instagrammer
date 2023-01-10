import { Module } from '@nestjs/common';
import { ApiAuthDataAccessModule } from '@instagrammer/api/component/user/data';
import { UserController } from './user.controller';

@Module({
  imports: [ApiAuthDataAccessModule],
  controllers: [UserController],
})
export class UserControllerModule {}
