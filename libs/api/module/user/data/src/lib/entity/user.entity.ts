import { Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommentEntity, PostEntity } from '@instagrammer/api/module/post/data';
import { AccountSettingsEntity } from '@instagrammer/api/module/settings/data';
import { RefreshTokenEntity } from './refresh-token.entity';
import { Exclude } from 'class-transformer';
import { FollowerEntity } from './follower.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ unique: true })
  public username!: string;

  @Column({ unique: true })
  public email!: string;

  @Column({ nullable: true })
  public fullName?: string;

  @Exclude()
  @Column()
  public password!: string;

  @Column()
  public dob!: Date;

  @OneToMany(() => FollowerEntity, follower => follower.follower)
  public following!: FollowerEntity[];

  @OneToMany(() => FollowerEntity, follower => follower.following)
  public followers!: FollowerEntity[];

  @OneToOne(() => RefreshTokenEntity)
  @JoinColumn()
  public refreshToken: RefreshTokenEntity | null = null;

  @OneToMany(() => PostEntity, post => post.user)
  public posts?: PostEntity[];

  @ManyToMany(() => PostEntity, post => post.likes)
  @JoinColumn()
  public postsLiked?: PostEntity[];

  @OneToMany(() => CommentEntity, comment => comment.commentMadeBy)
  public commentsOnPosts?: CommentEntity[];

  @OneToOne(() => AccountSettingsEntity, accountSettings => accountSettings.user)
  @JoinColumn()
  public accountSettings!: AccountSettingsEntity;
}
