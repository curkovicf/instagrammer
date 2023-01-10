import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostEntity } from '@instagrammer/api/core/entity';

@Injectable()
export class PostRepository extends Repository<PostEntity> {
  public async getPosts(userId: string): Promise<PostEntity[]> {
    return await this.find({
      where: { user: { userId: userId } },
      select: {
        postId: true,
        comments: true,
        description: true,
        likes: true,
        createdAt: true,
        photoPaths: true,
      },
    });
  }
}
