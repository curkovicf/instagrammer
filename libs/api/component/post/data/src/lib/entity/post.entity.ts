import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '@instagrammer/api/component/user/data';
import { PhotoEntity } from '@instagrammer/api/component/photo/data';
import { CommentEntity } from '@instagrammer/api/component/comment/data';

@Entity()
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
  public photoPaths!: PhotoEntity[];

  @ManyToMany(() => UserEntity, user => user.postsLiked)
  @JoinColumn()
  public likes?: UserEntity[];

  @OneToMany(() => CommentEntity, user => user.post, { cascade: true, eager: true })
  @JoinColumn()
  public comments!: CommentEntity[];
}
