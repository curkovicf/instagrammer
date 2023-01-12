import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtDto } from '@instagrammer/shared-data-access-api-auth-dto';
import { RefreshTokenEntity, RefreshTokenRepository } from '@instagrammer/api/module/user/data';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshTokenRepository) private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  public createNewRefreshToken(jwtDto: JwtDto): Promise<RefreshTokenEntity> {
    return this.refreshTokenRepository.createNewRefreshTokenEntity(jwtDto);
  }

  public async delete(refreshTokenId: string): Promise<void> {
    await this.refreshTokenRepository.delete({ refreshTokenId });
  }
}
