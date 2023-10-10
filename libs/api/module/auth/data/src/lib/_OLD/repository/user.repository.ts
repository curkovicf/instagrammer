import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entity/user.entity';
import { SignUpDto } from '@instagrammer/api/module/auth/logic';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  public async createUser(signUpDto: SignUpDto): Promise<void> {
    const { username, password, email, fullName, dob } = signUpDto;

    const newUser = this.create({
      username,
      email,
      fullName,
      password,
      dob,
    });

    await this.save(newUser);
  }

  public async findOneByUsernameOrEmail(usernameOrEmail: string): Promise<UserEntity | null> {
    return await this.createQueryBuilder('user')
      .where(`user.username = :username`, { username: usernameOrEmail })
      .orWhere(`user.email = :email`, { email: usernameOrEmail })
      .getOne();
  }
}
