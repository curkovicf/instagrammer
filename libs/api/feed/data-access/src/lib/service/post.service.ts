import { Injectable } from '@nestjs/common';
import { IPostService } from './post.interface';
import { PostEntity } from '@instagrammer/api/core/data-access';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from '../repository/post.repository';
import { UserRepository } from '@instagrammer/api/auth/data-access';

@Injectable()
export class PostService implements IPostService {
  constructor(
    @InjectRepository(PostRepository) private readonly postRepository: PostRepository,
    @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  public async getPosts(userId: string): Promise<PostEntity[]> {
    return await this.postRepository.find({
      where: { user: { userId: userId } },
      select: { postId: true, comments: true, description: true, likes: true, createdAt: true, photoPaths: true },
    });
  }
}
