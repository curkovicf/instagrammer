import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RefreshTokenEntity } from '../auth/refresh-token.entity';
import { PostEntity } from '../feed/post.entity';
import { CommentEntity } from '../feed/comment.entity';
import { AccountSettingsEntity } from './account-settings.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public userId!: string;

  @Column({ unique: true })
  public username!: string;

  @Column({ unique: true })
  public email!: string;

  @Column({ nullable: true })
  public fullName?: string;

  @Column()
  public password!: string;

  @Column()
  public dob!: Date;

  @OneToOne(() => RefreshTokenEntity, { cascade: true, eager: true })
  @JoinColumn()
  public refreshToken: RefreshTokenEntity | null = null;

  @OneToMany(() => PostEntity, post => post.user, { cascade: true })
  @JoinColumn()
  public posts?: PostEntity[];

  @ManyToMany(() => PostEntity, post => post.likes, { cascade: true })
  @JoinColumn()
  public postsLiked?: PostEntity[];

  @OneToMany(() => CommentEntity, comment => comment.commentMadeBy, { cascade: true })
  @JoinColumn()
  public commentsOnPosts?: CommentEntity[];

  @OneToOne(() => AccountSettingsEntity, accountSettings => accountSettings.user, { cascade: true })
  @JoinColumn()
  public accountSettings!: AccountSettingsEntity;
}
