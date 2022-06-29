import { EntityRepository, Repository } from 'typeorm';
import { RegisterDto } from '../dto/register.dto';
import { UserEntity } from '../entity/user.entity';
import { BcryptEncryptionService } from '@instagrammer/api/shared/util/encryption';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly bcryptEncryptionService: BcryptEncryptionService) {
    super();
  }

  public async createUser(registerDto: RegisterDto): Promise<void> {
    const { username, password, email, fullName, dob } = registerDto;

    const newUser = this.create({
      username,
      password: await this.bcryptEncryptionService.hash(password),
      dob,
    });

    await this.save(newUser);
  }
}
