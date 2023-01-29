import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('refresh_token')
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
