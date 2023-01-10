import { Module } from '@nestjs/common';
import { ApiShellModule } from '@instagrammer/api/shell';

@Module({
  imports: [ApiShellModule],
})
export class AppModule {}
