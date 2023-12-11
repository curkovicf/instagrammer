import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto, PhotoRepository, PostRepository } from '@instagrammer/api/module/post/data';
import { CommonApi, PostApi } from '@instagrammer/shared/data/api';
import { UserEntity } from '@instagrammer/api/module/user/data';

import 'multer';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository) private readonly postRepository: PostRepository,
    @InjectRepository(PhotoRepository) private readonly photoRepository: PhotoRepository,
  ) {}

  // public getPosts(userId: string): Promise<PostEntity[]> {
  // return this.postRepository.getPosts(userId);
  // }

  /**
   * Create post and store all associated data
   *
   * @param user
   * @param createPostDto
   * @param files
   */
  public async create(
    user: UserEntity,
    createPostDto: CreatePostDto,
    files: Express.Multer.File[],
  ): Promise<void> {
    const post = this.postRepository.create();

    post.user = user;
    post.description = createPostDto.caption;

    await this.postRepository.save(post);

    await this.photoRepository.createMany(files, post);
  }

  /**
   * Gets paginated list of posts
   *
   * @param user
   * @param paginate
   */
  public async getMany(
    user: UserEntity,
    paginate: CommonApi.PaginateRequest,
  ): Promise<CommonApi.PaginatedData<PostApi.Post<Buffer>>> {
    const take = paginate.pageSize || 7;
    const skip = (paginate.currentPage - 1) * paginate.pageSize || 0;

    //  TODO: Find only ones who are used by user instead of listing all posts once follower logic is ready
    //  TODO: Improve efficiency

    const [result, total] = await this.postRepository.findAndCount({
      take,
      skip,
      relations: { comments: true, photos: true },
    });

    return {
      total,
      data: result.map(post => ({
        caption: post.description ?? '',
        images: post.photos.map(photo => photo.imageData),
      })),
    };
  }
}
