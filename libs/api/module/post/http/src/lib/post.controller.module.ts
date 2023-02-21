import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostLogicModule } from '@instagrammer/api/module/post/logic';

@Module({
  controllers: [PostController],
  imports: [PostLogicModule],
})
export class PostControllerModule {}
