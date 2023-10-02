import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_settings')
export class AccountSettingsEntity {
  @PrimaryGeneratedColumn('uuid')
  public accountSettingsId!: string;

  @Column()
  public isDarkTheme!: boolean;

  @OneToOne(() => UserEntity, user => user.accountSettings)
  @JoinColumn()
  public user!: UserEntity;
}
