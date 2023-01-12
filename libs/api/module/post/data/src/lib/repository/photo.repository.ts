import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PhotoEntity } from '../entity/photo.entity';

@Injectable()
export class PhotoRepository extends Repository<PhotoEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(PhotoEntity, dataSource.createEntityManager());
  }
}
