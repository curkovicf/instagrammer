import { Module } from '@nestjs/common';
import { ApiCoreShellModule } from '@instagrammer/api/core/shell';

@Module({
  imports: [ApiCoreShellModule],
  exports: [ApiCoreShellModule],
})
export class ApiShellModule {}
