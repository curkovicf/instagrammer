import { Module } from '@nestjs/common';
import { FeedController } from './controller/feed.controller';

@Module({
  controllers: [FeedController],
})
export class FeedFeatureModule {}
