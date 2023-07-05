import { Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreatePostDto, PostEntity } from '@instagrammer/api/module/post/data';
import { PostService } from '@instagrammer/api/module/post/logic';
import { FileInterceptor } from '@nestjs/platform-express';

import { AuthGuard } from '@nestjs/passport';
import { User } from '@instagrammer/api/core/middleware/decorator';
import { UserEntity } from '@instagrammer/api/module/user/data';

import 'multer';

@Controller('post')
@UseGuards(AuthGuard('jwt'))
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  public getPosts(@User() user: UserEntity): Promise<PostEntity[]> {
    return this.postService.getPosts(user.id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  public createPost(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPostDto: CreatePostDto,
    @User() user: UserEntity,
  ): Promise<void> {
    return this.postService.createPost(user.id, createPostDto, file);
  }
}
