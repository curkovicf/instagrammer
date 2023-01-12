import { Module } from '@nestjs/common';
import { UserDataModule } from '@instagrammer/api/module/user/data';
import { UserController } from './user.controller';

@Module({
  imports: [UserDataModule],
  controllers: [UserController],
})
export class UserControllerModule {}
