import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PhotoEntity } from '../entity/photo.entity';
import { PostEntity } from '../entity/post.entity';

import 'multer';

@Injectable()
export class PhotoRepository extends Repository<PhotoEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(PhotoEntity, dataSource.createEntityManager());
  }

  public async createMany(files: Express.Multer.File[], post: PostEntity): Promise<PhotoEntity[]> {
    const photos: PhotoEntity[] = [];

    console.log('Files ', files);

    for await (const file of files) {
      const photo = this.create();

      photo.imageData = file.buffer;
      photo.imagePath = '';
      photo.post = post;

      photos.push(await this.save(photo));
    }

    return photos;
  }
}
