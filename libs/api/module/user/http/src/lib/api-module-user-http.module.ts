import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { ApiModuleUserDataModule } from '@instagrammer/api/module/user/data';

@Module({
  controllers: [UserController],
  imports: [ApiModuleUserDataModule],
})
export class ApiModuleUserHttpModule {}
