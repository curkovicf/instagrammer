import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AccountEntity } from '@instagrammer/api/module/auth/data';
import { PostEntity } from '@instagrammer/api/module/post/data';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column()
  public fullName!: string;

  @Column()
  public dob!: Date;

  // @OneToMany(() => FollowerEntity, follower => follower.follower)
  // public following!: FollowerEntity[];

  // @OneToMany(() => FollowerEntity, follower => follower.following)
  // public followers!: FollowerEntity[];

  @OneToMany(() => PostEntity, post => post.user)
  public posts?: PostEntity[];

  // @ManyToMany(() => PostEntity, post => post.likes)
  // @JoinColumn()
  // public postsLiked?: PostEntity[];

  // @OneToMany(() => CommentEntity, comment => comment.commentMadeBy)
  // public commentsOnPosts?: CommentEntity[];

  @OneToOne(() => AccountEntity, account => account.user)
  public account!: AccountEntity;

  // @OneToOne(() => AccountSettingsEntity, accountSettings => accountSettings.user)
  // @JoinColumn()
  // public accountSettings!: AccountSettingsEntity;
}
