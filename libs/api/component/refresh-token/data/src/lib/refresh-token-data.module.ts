import { Module } from '@nestjs/common';
import { RefreshTokenService } from './service/refresh-token.service';
import { RefreshTokenRepository } from './repository/refresh-token.repository';

@Module({
  providers: [RefreshTokenService, RefreshTokenRepository],
  exports: [RefreshTokenService],
})
export class RefreshTokenDataModule {}
