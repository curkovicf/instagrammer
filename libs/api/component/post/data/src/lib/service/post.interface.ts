import { PostEntity } from '@instagrammer/api/core/entity';

export interface IPostService {
  getPosts(userId: string): Promise<PostEntity[]>;
}
