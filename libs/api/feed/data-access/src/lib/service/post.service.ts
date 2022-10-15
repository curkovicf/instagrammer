import { Injectable } from '@nestjs/common';
import { IPostService } from './post.interface';
import { PostEntity } from '@instagrammer/api/core/data-access';

@Injectable()
export class FeedService implements IPostService {
  getPosts(): PostEntity[] {
    return [];
  }
}
