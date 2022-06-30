import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RefreshTokenEntity } from './refresh-token.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  userId!: string;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  fullName?: string;

  @Column()
  password!: string;

  @Column()
  dob!: Date;

  @OneToOne(() => RefreshTokenEntity, { cascade: true, eager: true })
  @JoinColumn()
  refreshToken: RefreshTokenEntity | null = null;
}
