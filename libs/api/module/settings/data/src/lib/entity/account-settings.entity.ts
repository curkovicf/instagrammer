import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '@instagrammer/api/module/user/data';

@Entity()
export class AccountSettingsEntity {
  @PrimaryGeneratedColumn('uuid')
  public accountSettingsId!: string;

  @Column()
  public isDarkTheme!: boolean;

  @OneToOne(() => UserEntity, user => user.accountSettings)
  @JoinColumn()
  public user!: UserEntity;
}
