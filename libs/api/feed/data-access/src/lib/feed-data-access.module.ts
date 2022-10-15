import { Module } from '@nestjs/common';
import { FeedService } from './service/post.service';

@Module({
  providers: [FeedService],
})
export class FeedDataAccessModule {}
