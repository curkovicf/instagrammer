import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from '@instagrammer/api/component/post/data';

@Entity()
export class PhotoEntity {
  @PrimaryGeneratedColumn('uuid')
  public imageId!: string;

  @Column()
  public imagePath!: string;

  @Column()
  public createdAt!: Date;

  @ManyToOne(() => PostEntity, post => post.photoPaths)
  @JoinColumn()
  public post!: PostEntity;
}
