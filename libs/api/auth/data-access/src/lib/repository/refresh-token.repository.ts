import { EntityRepository, Repository } from 'typeorm';
import { RefreshTokenEntity } from '../entity/refresh-token.entity';
import { JwtDto } from '@instagrammer/shared-data-access-api-auth-dto';

@EntityRepository(RefreshTokenEntity)
export class RefreshTokenRepository extends Repository<RefreshTokenEntity> {
  public async createNewRefreshTokenEntity(refreshToken: JwtDto): Promise<RefreshTokenEntity> {
    const refreshTokenEntity = new RefreshTokenEntity();

    refreshTokenEntity.hashedRefreshToken = refreshToken.value;
    refreshTokenEntity.issuedAt = new Date(refreshToken.issuedAt);
    refreshTokenEntity.expiresAt = new Date(refreshToken.expiresAt);

    return refreshTokenEntity;
  }
}
