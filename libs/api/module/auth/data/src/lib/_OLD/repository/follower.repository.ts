import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { FollowerEntity } from '../entity/follower.entity';

@Injectable()
export class FollowerRepository extends Repository<FollowerEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(FollowerEntity, dataSource.createEntityManager());
  }
}
