import { EntityRepository, getConnection, Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { RegisterRequestDto } from '@instagrammer/shared-data-access-api-auth-dto';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  public async createUser(registerDto: RegisterRequestDto): Promise<void> {
    const { username, password, email, fullName, dob } = registerDto;

    const newUser = this.create({
      username,
      email,
      fullName,
      password,
      dob,
    });

    await this.save(newUser);
  }

  public async findOneByUsernameOrEmail(usernameOrEmail: string): Promise<UserEntity | undefined> {
    return await getConnection()
      .createQueryBuilder(UserEntity, 'user')
      .where(`user.username = :username`, { username: usernameOrEmail })
      .orWhere(`user.email = :email`, { email: usernameOrEmail })
      .getOne();
  }
}
