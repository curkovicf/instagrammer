import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { Injectable } from '@angular/core';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(readonly dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }
}
