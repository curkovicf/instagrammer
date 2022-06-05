import { EntityRepository, Repository } from 'typeorm';
import { RegisterDto } from '../dto/register.dto';
import { UserEntity } from '../entity/user.entity';
import { hashWithSalt } from '@instagrammer/api/shared/util/encryption';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  public async createUser(registerDto: RegisterDto, refreshToken: string): Promise<void> {
    const { username, password, email, fullName, dob } = registerDto;

    const hashedRefreshToken = await hashWithSalt(refreshToken);

    const newUser = this.create({
      username,
      password: await hashWithSalt(password),
      dob,
      refreshToken: {
        hashedRefreshToken,
        createdAt: new Date(),
        expiresAt: new Date(),
      },
    });

    await this.save(newUser);
  }
}
