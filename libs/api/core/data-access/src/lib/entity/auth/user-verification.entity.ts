import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserVerificationEntity {
  @PrimaryGeneratedColumn('uuid')
  public userVerificationId!: string;

  @Column()
  public uniqueString!: string;

  @Column()
  public createdAt!: Date;

  @Column()
  public expiresAt!: Date;
}
