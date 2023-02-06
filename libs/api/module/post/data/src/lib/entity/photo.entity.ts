import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from './post.entity';

@Entity('photo')
export class PhotoEntity {
  @PrimaryGeneratedColumn('uuid')
  public imageId!: string;

  @Column()
  public imagePath!: string;

  @Column()
  public createdAt!: Date;

  @ManyToOne(() => PostEntity, post => post.photos)
  @JoinColumn()
  public post!: PostEntity;
}
