import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PostEntity } from '../entity/post.entity';

// import { FollowerEntity } from '@instagrammer/api/module/user/data';

@Injectable()
export class PostRepository extends Repository<PostEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(PostEntity, dataSource.createEntityManager());
  }

  // public async getPosts(userId: string): Promise<PostEntity[]> {
  //   return await this.createQueryBuilder('post')
  //     .innerJoin(FollowerEntity, 'follower', 'follower.followerId = :userId', { userId })
  //     .getMany();
  // }
}
