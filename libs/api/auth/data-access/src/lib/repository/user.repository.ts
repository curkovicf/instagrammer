import { EntityRepository, Repository } from 'typeorm';
import { RegisterDto } from '../dto/register.dto';

import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../entity/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  public async createUser(registerDto: RegisterDto): Promise<void> {
    const { username, password, email, fullName, dob } = registerDto;

    const newUser = this.create({
      username,
      password: await this.hashPasswordWithSalt(password),
      verified: false,
      dob,
      userVerification: {
        createdAt: new Date(),
        expiresAt: new Date(),
        uniqueString: uuidv4(),
      },
    });

    await this.save(newUser);
  }

  private async hashPasswordWithSalt(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();

    return await bcrypt.hash(password, salt);
  }
}
