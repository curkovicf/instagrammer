import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostEntity } from '@instagrammer/api/core/entity';
import { CreatePostDto, PostService } from '@instagrammer/api/component/post/data';

@Controller('feed')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':userId')
  public getPosts(@Param('userId') userId: string): Promise<PostEntity[]> {
    return this.postService.getPosts(userId);
  }

  @Post(':userId')
  public createPost(@Param('userId') userId: string, @Body() createPostDto: CreatePostDto): Promise<void> {
    return this.postService.createPost(userId, createPostDto);
  }
}
