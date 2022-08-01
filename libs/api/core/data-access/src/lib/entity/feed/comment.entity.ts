import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  @OneToMany(() => UserEntity, user => user.commentsOnPosts)
  @JoinColumn()
  public commentMadeBy!: UserEntity;

  @OneToMany(() => PostEntity, post => post.comments)
  @JoinColumn()
  public post!: PostEntity;
}
