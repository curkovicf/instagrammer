import { PostEntity } from '@instagrammer/api/core/data-access';

export interface IPostService {
  getPosts(userId: string): Promise<PostEntity[]>;
}
