import { Module } from '@nestjs/common';
import { ApiShellModule } from '@instagrammer/api/shell/feature';

@Module({
  imports: [ApiShellModule],
})
export class AppModule {}
