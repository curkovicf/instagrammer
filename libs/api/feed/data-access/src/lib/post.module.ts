import { Module } from '@nestjs/common';
import { PostService } from './service/post.service';

@Module({
  providers: [PostService],
})
export class FeedDataAccessModule {}
