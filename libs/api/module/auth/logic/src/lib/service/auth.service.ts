import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseEncryptionService } from '@instagrammer/api/shared/util/encryption';
import { JwtAuthService } from './jwt-auth.service';
import { AccountRepository } from '@instagrammer/api/module/auth/data';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@instagrammer/api/module/user/data';
import { SignUpDto } from '../dto/sign-up.dto';
import { QueryFailedError } from 'typeorm';
import { SignInDto } from '../dto/sign-in.dto';
import { UserApi } from '@instagrammer/shared/data/api';
import { UsernameDto } from '../dto/username.dto';
import { SignOutDto } from '../dto/sign-out.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(AccountRepository)
    private readonly accountRepository: AccountRepository,
    private readonly jwtAuthService: JwtAuthService,
    private readonly encryptionService: BaseEncryptionService,
  ) {}

  /**
   * Attempts to create/register new user
   * @param signUpDto
   */
  public async signUp(signUpDto: SignUpDto): Promise<void> {
    try {
      await this.accountRepository.createUser({
        ...signUpDto,
        password: await this.encryptionService.hash(signUpDto.password),
      });
    } catch (err) {
      if (err instanceof QueryFailedError && Number(err.driverError.code) === 23505) {
        throw new ConflictException('Username already taken');
      } else {
        throw new InternalServerErrorException('Error while creating a new user');
      }
    }
  }

  /**
   * Attempts to log-in/sign-in user
   * @param signInDto
   */
  public async signIn(signInDto: SignInDto): Promise<UserApi.LoginResponseWrapperDto> {
    //  1. Extract data from DTO
    const { username, password, email, isLongSession } = signInDto;

    //  2. Find user via email or username
    const user = await this.accountRepository.findOneByUsernameOrEmail(username ?? email);

    //  3. If not user throw exception
    if (!user) {
      throw new NotFoundException(
        "The username you entered doesn't belong to an account. Please check your username and try again.",
      );
    }

    //  4. If invalid password, throw invalid password
    if (!(await this.encryptionService.compare(password, user.password))) {
      throw new UnauthorizedException(
        'Sorry, your password was incorrect. Please double-check your password.',
      );
    }

    //  5. Generate access & refresh token pairs
    const { accessToken, refreshToken } = this.jwtAuthService.generateAuthTokenPair(isLongSession);

    //  6. Hash and store new refresh token to the DB
    user.refreshToken = await this.encryptionService.hash(refreshToken);

    //  8. Save user with updated refresh token data
    await this.userRepository.save(user);

    //  9. Map data and return needed results to the frontend part
    return {
      loginResponseDto: {
        username,
      },
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  /**
   * Checks if username is being used in the database
   * @param usernameDto
   */
  public async checkIfUsernameExists({ username }: UsernameDto): Promise<UserApi.UsernameExistsResponseDto> {
    const responseDto: UserApi.UsernameExistsResponseDto = { username, isUsernameAvailable: false };

    const usernameExists = await this.accountRepository.findOne({ where: { username } });

    if (usernameExists) {
      return responseDto;
    }

    responseDto.isUsernameAvailable = true;

    return responseDto;
  }

  /**
   * Attempts to log-out user
   * @param signOutDto
   */
  async signOut({ usernameOrEmail }: SignOutDto): Promise<void> {
    const user = await this.accountRepository.findOneByUsernameOrEmail(usernameOrEmail);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.refreshToken = null;

    await this.userRepository.save(user);
  }

  public signInViaRefreshToken(refreshToken: string): {
    accessToken: string;
    refreshToken: string;
  } {
    return {
      accessToken: '',
      refreshToken: '',
    };
  }
}
