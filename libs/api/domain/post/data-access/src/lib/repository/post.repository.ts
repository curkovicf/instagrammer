import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostEntity } from '@instagrammer/api/core/data-access';

@Injectable()
export class PostRepository extends Repository<PostEntity> {}
