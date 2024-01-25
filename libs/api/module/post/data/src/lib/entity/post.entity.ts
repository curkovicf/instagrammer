import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PhotoEntity } from './photo.entity';
import { CommentEntity } from './comment.entity';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { UserEntity } from '@instagrammer/api/module/user/data';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ nullable: true })
  public description?: string;

  @ManyToOne(() => UserEntity, user => user.posts)
  @JoinColumn()
  public user!: UserEntity;

  @OneToMany(() => PhotoEntity, photo => photo.post, { cascade: true, nullable: false })
  public photos!: PhotoEntity[];

  // @ManyToMany(() => UserEntity, user => user.postsLiked)
  // public likes?: UserEntity[];

  @OneToMany(() => CommentEntity, user => user.post, { cascade: true })
  public comments!: CommentEntity[];

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}
