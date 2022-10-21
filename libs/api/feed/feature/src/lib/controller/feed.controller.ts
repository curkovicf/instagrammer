import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IFeedController } from './feed.controller.interface';
import { PostEntity } from '@instagrammer/api/core/data-access';
import { CreatePostDto, PostService } from '@instagrammer/api/feed/data-access';

@Controller('feed')
export class FeedController implements IFeedController {
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
