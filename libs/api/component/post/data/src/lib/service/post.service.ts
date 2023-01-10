import { Injectable } from '@nestjs/common';
import { IPostService } from './post.interface';
import { PostEntity } from '@instagrammer/api/core/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from '../repository/post.repository';
import { CreatePostDto } from '../dto/create-post.dto';

@Injectable()
export class PostService implements IPostService {
  constructor(@InjectRepository(PostRepository) private readonly postRepository: PostRepository) {}

  public async getPosts(userId: string): Promise<PostEntity[]> {
    return await this.postRepository.getPosts(userId);
  }

  public createPost(userId: string, createPostDto: CreatePostDto): Promise<void> {
    //  TODO: Impl
    return Promise.resolve(undefined);
  }
}
