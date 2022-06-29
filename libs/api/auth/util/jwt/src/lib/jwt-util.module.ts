import { forwardRef, Module } from '@nestjs/common';
import { JwtUtilService } from './service/jwt-util.service';
import { ApiCoreModule } from '@instagrammer/api/core';

@Module({
  imports: [forwardRef(() => ApiCoreModule)],
  providers: [JwtUtilService],
  exports: [JwtUtilService],
})
export class JwtUtilModule {}
