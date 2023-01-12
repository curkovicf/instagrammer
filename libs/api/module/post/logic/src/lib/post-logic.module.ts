import { Global, Module } from '@nestjs/common';
import { PostService } from './service/post.service';

@Global()
@Module({
  providers: [PostService],
  exports: [PostService],
})
export class PostLogicModule {}
