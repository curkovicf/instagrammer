import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RefreshTokenEntity } from './refresh-token.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  userId!: string;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column()
  dob!: Date;

  @OneToOne(() => RefreshTokenEntity, { cascade: true })
  @JoinColumn()
  refreshToken: RefreshTokenEntity | null = null;
}
