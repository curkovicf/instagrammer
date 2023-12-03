import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PhotoEntity } from './photo.entity';
import { CommentEntity } from './comment.entity';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ nullable: true })
  public description?: string;

  // @ManyToOne(() => UserEntity, user => user.posts)
  // @JoinColumn()
  // public user!: UserEntity;

  @OneToMany(() => PhotoEntity, photo => photo.imagePath, { cascade: true, nullable: false })
  @JoinColumn()
  public photos!: PhotoEntity[];

  // @ManyToMany(() => UserEntity, user => user.postsLiked)
  // @JoinColumn()
  // public likes?: UserEntity[];

  @OneToMany(() => CommentEntity, user => user.post, { cascade: true })
  @JoinColumn()
  public comments!: CommentEntity[];

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}
