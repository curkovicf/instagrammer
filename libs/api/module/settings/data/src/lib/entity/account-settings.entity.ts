import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { UserEntity } from '@instagrammer/api/module/user/data';

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
