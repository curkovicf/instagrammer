import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FollowerEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column()
  public userId!: number;

  @Column()
  public followedByUserId!: number;
}
