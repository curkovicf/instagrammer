import { EntityRepository, Repository } from 'typeorm';
import { RegisterDto } from '../dto/register.dto';
import { UserEntity } from '../entity/user.entity';
import { BCryptEncryptionService } from '@instagrammer/api/shared/util/encryption';
import { JwtService } from '@nestjs/jwt';
import { JwtSignOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  constructor(
    private readonly encryptionService: BCryptEncryptionService,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  public async createUser(registerDto: RegisterDto): Promise<void> {
    const { username, password, email, fullName, dob } = registerDto;

    const hashedRefreshToken = this.createRefreshToken(username);

    const newUser = this.create({
      username,
      password: await this.encryptionService.hashWithSalt(password),
      dob,
      refreshToken: {
        hashedRefreshToken,
        createdAt: new Date(),
        expiresAt: new Date(),
      },
    });

    await this.save(newUser);
  }

  private createRefreshToken(username: string): string {
    const payload = {
      username,
    };

    const options: JwtSignOptions = {
      secret: 'refresh_token',
      expiresIn: 100000000,
    };

    return this.jwtService.sign(payload, options);
  }
}
