import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '@instagrammer/api/module/user/data';
import { PhotoEntity } from './photo.entity';
import { CommentEntity } from './comment.entity';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  public postId!: string;

  @Column({ nullable: true })
  public description?: string;

  @Column()
  public createdAt!: Date;

  @ManyToOne(() => UserEntity, user => user.posts)
  @JoinColumn()
  public user!: UserEntity;

  @OneToMany(() => PhotoEntity, photo => photo.imagePath, { cascade: true, nullable: false })
  @JoinColumn()
  public photos!: PhotoEntity[];

  @ManyToMany(() => UserEntity, user => user.postsLiked)
  @JoinColumn()
  public likes?: UserEntity[];

  @OneToMany(() => CommentEntity, user => user.post, { cascade: true })
  @JoinColumn()
  public comments!: CommentEntity[];
}
