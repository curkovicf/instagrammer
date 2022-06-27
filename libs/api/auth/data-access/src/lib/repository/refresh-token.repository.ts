import { EntityRepository, Repository } from 'typeorm';
import { RefreshTokenEntity } from '../entity/refresh-token.entity';

@EntityRepository(RefreshTokenEntity)
export class RefreshTokenRepository extends Repository<RefreshTokenEntity> {}
