import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  userId!: string;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  // @Column()
  // fullName!: string;

  // @Column({ unique: true })
  // email!: string;

  // @Column()
  // bio?: string;

  // @Column()
  // createdAt!: Date;
}
