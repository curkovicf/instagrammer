import { DataSource, Repository } from 'typeorm';
import { AccountEntity } from '../entity/account.entity';
import { SignUpDto } from '@instagrammer/api/module/auth/logic';

export class AccountRepository extends Repository<AccountEntity> {
  constructor(readonly dataSource: DataSource) {
    super(AccountEntity, dataSource.createEntityManager());
  }

  public createUser(signUpDto: SignUpDto): Promise<AccountEntity> {
    const { username, password, email } = signUpDto;

    const newUser = this.create({
      username,
      email,
      password,
    });

    return this.save(newUser);
  }

  public findOneByUsernameOrEmail(usernameOrEmail: string): Promise<AccountEntity | null> {
    return this.createQueryBuilder('user')
      .where(`user.username = :username`, { username: usernameOrEmail })
      .orWhere(`user.email = :email`, { email: usernameOrEmail })
      .getOne();
  }
}
