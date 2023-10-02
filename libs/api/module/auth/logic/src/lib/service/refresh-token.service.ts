import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { RefreshTokenEntity, RefreshTokenRepository } from '@instagrammer/api/module/user/data';
import { UserApi } from '@instagrammer/shared/data/api';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshTokenRepository) private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  public createNewRefreshToken(jwtDto: UserApi.JwtDto): Promise<RefreshTokenEntity> {
    return this.refreshTokenRepository.createNewRefreshTokenEntity(jwtDto);
  }

  public async delete(refreshTokenId: string): Promise<void> {
    await this.refreshTokenRepository.delete({ refreshTokenId });
  }
}
