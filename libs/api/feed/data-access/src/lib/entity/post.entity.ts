import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '@instagrammer/api/auth/data-access';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  postId!: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  createdAt!: Date;

  @ManyToOne(() => UserEntity, user => user.posts, { cascade: true })
  @JoinColumn()
  user!: UserEntity;
}
