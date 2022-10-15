import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { PhotoEntity } from './photo.entity';
import { CommentEntity } from './comment.entity';

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

  @ManyToOne(() => CommentEntity, user => user.post, { cascade: true, eager: true })
  @JoinColumn()
  public comments!: CommentEntity[];
}
