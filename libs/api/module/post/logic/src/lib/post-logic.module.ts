import { Global, Module } from '@nestjs/common';
import { PostService } from './service/post.service';
import { PostDataModule } from '@instagrammer/api/module/post/data';

@Global()
@Module({
  imports: [PostDataModule],
  providers: [PostService],
  exports: [PostService],
})
export class PostLogicModule {}
