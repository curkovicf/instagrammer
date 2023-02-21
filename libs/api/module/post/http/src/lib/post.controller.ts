import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreatePostDto, PostEntity } from '@instagrammer/api/module/post/data';
import { PostService } from '@instagrammer/api/module/post/logic';
import { UserId } from '@instagrammer/api/module/user/logic';

@Controller('feed')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  public getPosts(@Query('userId') userId: string): Promise<PostEntity[]> {
    return this.postService.getPosts(userId);
  }

  @Post(':userId')
  public createPost(@Param('userId') userId: string, @Body() createPostDto: CreatePostDto): Promise<void> {
    return this.postService.createPost(userId, createPostDto);
  }
}
