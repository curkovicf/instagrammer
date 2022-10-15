import { DataSource, Repository } from 'typeorm';
import { JwtDto } from '@instagrammer/shared-data-access-api-auth-dto';
import { RefreshTokenEntity } from '@instagrammer/api/core/data-access';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenRepository extends Repository<RefreshTokenEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(RefreshTokenEntity, dataSource.createEntityManager());
  }

  public async createNewRefreshTokenEntity(refreshToken: JwtDto): Promise<RefreshTokenEntity> {
    const refreshTokenEntity = new RefreshTokenEntity();

    refreshTokenEntity.hashedRefreshToken = refreshToken.value;
    refreshTokenEntity.issuedAt = new Date(refreshToken.issuedAt);
    refreshTokenEntity.expiresAt = new Date(refreshToken.expiresAt);

    return refreshTokenEntity;
  }
}
