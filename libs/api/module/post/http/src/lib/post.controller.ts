import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePostDto } from '@instagrammer/api/module/post/data';
import { PostService } from '@instagrammer/api/module/post/logic';

import { AuthGuard } from '@nestjs/passport';
import { User } from '@instagrammer/api/module/auth/middleware';
import { UserEntity } from '@instagrammer/api/module/user/data';
import { CommonApi, PostApi } from '@instagrammer/shared/data/api';
import { FilesInterceptor } from '@nestjs/platform-express';

import 'multer';

@Controller('post')
@UseGuards(AuthGuard('jwt'))
export class PostController {
  private readonly logger = new Logger(PostController.name);

  constructor(private readonly postService: PostService) {}

  @Get()
  public getManyPaginated(
    @User() user: UserEntity,
    @Query() paginate: CommonApi.PaginateRequest,
  ): Promise<CommonApi.PaginatedData<PostApi.Post<Buffer>>> {
    this.logger.debug(`Getting paginated list of posts, user Id: ${user.id}`);

    return this.postService.getMany(user, paginate);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  public create(
    @UploadedFiles() file: Express.Multer.File[],
    @Body() createPostDto: CreatePostDto,
    @User() user: UserEntity,
  ): Promise<void> {
    this.logger.debug(`Uploading post, user Id: ${user.id}`);

    return this.postService.create(user, createPostDto, file);
  }
}
