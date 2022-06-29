import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { BcryptEncryptionService } from '@instagrammer/api/shared/util/encryption';
import { RegisterRequestDto } from '@instagrammer/shared-data-access-api-auth-dto';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly bcryptEncryptionService: BcryptEncryptionService) {
    super();
  }

  public async createUser(registerDto: RegisterRequestDto): Promise<void> {
    const { username, password, email, fullName, dob } = registerDto;

    const newUser = this.create({
      username,
      password: await this.bcryptEncryptionService.hash(password),
      dob,
    });

    await this.save(newUser);
  }
}
