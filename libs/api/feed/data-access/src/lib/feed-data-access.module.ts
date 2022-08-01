import { Module } from '@nestjs/common';
import { FeedService } from './service/feed.service';

@Module({
  providers: [FeedService],
})
export class FeedDataAccessModule {}
