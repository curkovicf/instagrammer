import { EntityRepository, Repository } from 'typeorm';
import { RegisterDto } from '../dto/register.dto';

import * as bcrypt from 'bcrypt';
import { UserEntity } from '../entity/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  public async createUser(registerDto: RegisterDto): Promise<void> {
    const { username, password, email, fullName } = registerDto;

    const newUser = this.create({ username, password: await this.hashPasswordWithSalt(password) });

    await this.save(newUser);
  }

  private async hashPasswordWithSalt(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
}
