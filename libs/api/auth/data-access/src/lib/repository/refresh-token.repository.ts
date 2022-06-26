import { EntityRepository, Repository } from 'typeorm';
import { RefreshTokenEntity } from '@instagrammer/api/auth/data-access';

@EntityRepository(RefreshTokenEntity)
export class RefreshTokenRepository extends Repository<RefreshTokenEntity> {}
