import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

// https://security.stackexchange.com/questions/266399/should-user-credentials-and-user-info-be-stored-in-seperate-tables

@Entity('account')
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ unique: true })
  public username!: string;

  @Column({ unique: true })
  public email!: string;

  @Exclude()
  @Column()
  public password!: string;

  @Column({
    nullable: true,
  })
  public refreshToken?: string;
}
