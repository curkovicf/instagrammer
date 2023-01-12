import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CommentEntity } from '../entity/comment.entity';

@Injectable()
export class CommentRepository extends Repository<CommentEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CommentEntity, dataSource.createEntityManager());
  }
}
