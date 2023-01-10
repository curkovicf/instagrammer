import { Module } from '@nestjs/common';
import { PostService } from './service/post.service';
import { PostRepository } from './repository/post.repository';

@Module({
  providers: [PostService, PostRepository],
})
export class PostModule {}
