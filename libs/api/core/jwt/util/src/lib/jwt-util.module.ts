import { Module } from '@nestjs/common';
import { JwtUtilService } from './service/jwt-util.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  providers: [JwtUtilService],
  exports: [JwtUtilService],
})
export class JwtUtilModule {}
