import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto, PostEntity, PostRepository } from '@instagrammer/api/module/post/data';

@Injectable()
export class PostService {
  constructor(@InjectRepository(PostRepository) private readonly postRepository: PostRepository) {}

  public async getPosts(userId: string): Promise<PostEntity[]> {
    return await this.postRepository.getPosts(userId);
  }

  public createPost(userId: string, createPostDto: CreatePostDto): Promise<void> {
    //  TODO: Impl
    return Promise.resolve(undefined);
  }
}
