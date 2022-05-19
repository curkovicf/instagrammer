import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserVerificationEntity {
  @PrimaryGeneratedColumn('uuid')
  userVerificationId!: string;

  @Column()
  uniqueString!: string;

  @Column()
  createdAt!: Date;

  @Column()
  expiresAt!: Date;
}
