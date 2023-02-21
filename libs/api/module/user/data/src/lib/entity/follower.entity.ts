import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('follower')
export class FollowerEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @ManyToOne(() => UserEntity, user => user.following)
  public follower!: UserEntity;

  @ManyToOne(() => UserEntity, user => user.followers)
  public following!: UserEntity;
}
