import { PostEntity } from '@instagrammer/api/core/data-access';

export interface IFeedController {
  getPosts(userId: string): Promise<PostEntity[]>;
}
