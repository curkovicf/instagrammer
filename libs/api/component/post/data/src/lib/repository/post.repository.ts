import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostEntity } from '@instagrammer/api/core/entity';

@Injectable()
export class PostRepository extends Repository<PostEntity> {}
