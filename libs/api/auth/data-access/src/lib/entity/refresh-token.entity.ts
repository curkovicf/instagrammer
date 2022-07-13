import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

@Entity()
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  refreshTokenId!: string;

  @Column()
  @OneToOne(() => UserEntity)
  hashedRefreshToken!: string;

  @Column()
  issuedAt!: Date;

  @Column()
  expiresAt!: Date;
}
