import { Global, Module } from '@nestjs/common';
import { PostRepository } from './repository/post.repository';
import { PhotoRepository } from './repository/photo.repository';
import { CommentRepository } from './repository/comment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entity/post.entity';
import { PhotoEntity } from './entity/photo.entity';
import { CommentEntity } from './entity/comment.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, PhotoEntity, CommentEntity])],
  providers: [PostRepository, PhotoRepository, CommentRepository],
  exports: [PostRepository, PhotoRepository, CommentRepository],
})
export class PostDataModule {}
