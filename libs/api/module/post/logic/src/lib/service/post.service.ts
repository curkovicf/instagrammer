import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreatePostDto,
  PhotoRepository,
  PostEntity,
  PostRepository,
} from '@instagrammer/api/module/post/data';

import 'multer';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository) private readonly postRepository: PostRepository,
    @InjectRepository(PhotoRepository) private readonly photoRepository: PhotoRepository,
  ) {}

  public getPosts(userId: string): Promise<PostEntity[]> {
    return this.postRepository.getPosts(userId);
  }

  public async createPost(
    userId: string,
    createPostDto: CreatePostDto,
    file: Express.Multer.File,
  ): Promise<void> {
    const post = await this.postRepository.create();

    post.description = createPostDto.caption;

    await this.postRepository.save(post);

    const photo = await this.photoRepository.create();

    photo.imageData = file.buffer;
    photo.imagePath = '';
    photo.post = post;

    await this.photoRepository.save(photo);
  }
}
