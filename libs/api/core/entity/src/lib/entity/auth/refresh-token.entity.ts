import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity()
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  public refreshTokenId!: string;

  @Column()
  @OneToOne(() => UserEntity)
  public hashedRefreshToken!: string;

  @Column()
  public issuedAt!: Date;

  @Column()
  public expiresAt!: Date;
}
