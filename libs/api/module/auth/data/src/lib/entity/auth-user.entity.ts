import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('auth_user')
export class AuthUserEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({
    nullable: true,
  })
  public refreshToken?: string;
}
