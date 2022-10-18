import { Controller, Get, Param } from '@nestjs/common';
import { IFeedController } from './feed.controller.interface';
import { PostEntity } from '@instagrammer/api/core/data-access';
import { PostService } from '@instagrammer/api/feed/data-access';

@Controller('feed')
export class FeedController implements IFeedController {
  constructor(private readonly postService: PostService) {}

  @Get(':userId')
  public getPosts(@Param('userId') userId: string): Promise<PostEntity[]> {
    return this.postService.getPosts(userId);
  }
}
