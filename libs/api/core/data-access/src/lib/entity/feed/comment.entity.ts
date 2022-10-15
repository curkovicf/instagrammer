import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { PostEntity } from './post.entity';

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
