import { Module } from '@nestjs/common';
import { UserControllerModule } from '@instagrammer/api/component/user/controller';

@Module({
  imports: [UserControllerModule],
  exports: [UserControllerModule],
})
export class ApiShellModule {}
