import { EntityRepository, Repository } from 'typeorm';
import { RegisterDto } from '../dto/register.dto';
import { UserEntity } from '../entity/user.entity';
import { hashWithSalt } from '@instagrammer/api/shared/util/encryption';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  public async createUser(registerDto: RegisterDto): Promise<void> {
    const { username, password, email, fullName, dob } = registerDto;

    const newUser = this.create({
      username,
      password: await hashWithSalt(password),
      dob,
    });

    await this.save(newUser);
  }
}
