import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '@instagrammer/api/component/user/data';
import { PostEntity } from '@instagrammer/api/component/post/data';

@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  public commentId!: string;

  @Column()
  public text!: string;

  @Column()
  public createdAt!: Date;

  @ManyToOne(() => UserEntity, user => user.commentsOnPosts)
  @JoinColumn()
  public commentMadeBy!: UserEntity;

  @ManyToOne(() => PostEntity, post => post.comments)
  @JoinColumn()
  public post!: PostEntity;
}
