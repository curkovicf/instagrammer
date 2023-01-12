import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserLogicModule } from '@instagrammer/api/module/user/logic';

@Module({
  imports: [UserLogicModule],
  controllers: [UserController],
})
export class UserControllerModule {}
