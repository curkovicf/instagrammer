import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '@instagrammer/api/auth/data-access';

@Entity()
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  refreshTokenId!: string;

  @Column()
  @OneToOne(() => UserEntity)
  hashedRefreshToken!: string;

  @Column()
  createdAt!: Date;

  @Column()
  expiresAt!: Date;
}
