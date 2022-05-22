import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserVerificationEntity } from './user-verification.entity';

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

  @Column()
  verified!: boolean;

  @OneToOne(() => UserVerificationEntity, { cascade: true })
  @JoinColumn()
  userVerification!: UserVerificationEntity;
}
