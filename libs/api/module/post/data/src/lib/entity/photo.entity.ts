import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostEntity } from './post.entity';

@Entity('photo')
export class PhotoEntity {
  @PrimaryGeneratedColumn('uuid')
  public imageId!: string;

  //  TODO: use Docker container to store images
  @Column()
  public imagePath!: string;

  //  WORKAROUND URL: https://stackoverflow.com/questions/55498140/saving-buffer-on-postgres-bytea-with-typeorm-only-store-10-bytes
  //  TODO: to be removed
  @Column({
    name: 'imageData',
    type: 'bytea',
    nullable: false,
  })
  public imageData!: Buffer;

  @ManyToOne(() => PostEntity, post => post.photos)
  @JoinColumn()
  public post!: PostEntity;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}
