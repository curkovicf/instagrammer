import { Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreatePostDto, PostEntity } from '@instagrammer/api/module/post/data';
import { PostService } from '@instagrammer/api/module/post/logic';
import { FileInterceptor } from '@nestjs/platform-express';

import 'multer';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  public getPosts(@Query('userId') userId: string): Promise<PostEntity[]> {
    return this.postService.getPosts(userId);
  }

  @Post()
  // @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  public createPost(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPostDto: CreatePostDto,
  ): Promise<void> {
    const userId = '3060af02-6358-41f8-8140-b6825164eb4f';

    return this.postService.createPost(userId, createPostDto, file);
  }
}
