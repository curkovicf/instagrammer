import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError } from 'typeorm';
import { BaseEncryptionService } from '@instagrammer/api/shared/util/encryption';
import { UserApi } from '@instagrammer/shared/data/api';
import { AccountRepository } from '@instagrammer/api/module/auth/data';
import { JwtAuthService } from './jwt-auth.service';
import { UserRepository } from '@instagrammer/api/module/user/data';
import { SignUpDto } from '../dto/sign-up.dto';
import { UsernameDto } from '../dto/username.dto';
import { SignInDto } from '../dto/sign-in.dto';
import { SignOutDto } from '../dto/sign-out.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(AccountRepository)
    private readonly accountRepository: AccountRepository,
    private readonly jwtUtilService: JwtAuthService,
    private readonly encryptionService: BaseEncryptionService,
  ) {}

  /**
   * Attempts to create/register new user
   * @param signUpDto
   */
  public async signUp(signUpDto: SignUpDto): Promise<UserApi.LoginResponseWrapperDto> {
    try {
      await this.accountRepository.createUser({
        ...signUpDto,
        password: await this.encryptionService.hash(signUpDto.password),
      });

      return this.signIn(signUpDto);
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
    const { accessToken, refreshToken } = this.jwtUtilService.generateTokenPair(username, isLongSession);

    //  6. Delete existing refresh token
    user.refreshToken = null;

    //  7. Create new refresh token and attach it to the user
    user.refreshToken = await this.jwtUtilService.generateToken();
    user.refreshToken = await this.refreshTokenService.createNewRefreshToken({
      ...refreshToken,
      value: await this.encryptionService.hash(refreshToken.value),
    });

    //  8. Save user with updated refresh token data
    await this.userRepository.save(user);

    //  9. Map data and return needed results to the frontend part
    return {
      loginResponseDto: {
        username,
      },
      accessToken: accessToken.value,
      refreshToken: refreshToken.value,
    };
  }

  /**
   * Checks if username is being used in the database
   * @param usernameDto
   */
  public async checkIfUsernameExists(usernameDto: UsernameDto): Promise<UserApi.UsernameExistsResponseDto> {
    const { username } = usernameDto;
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
  async signOut(signOutDto: SignOutDto): Promise<void> {
    const { usernameOrEmail } = signOutDto;

    const user = await this.accountRepository.findOneByUsernameOrEmail(usernameOrEmail);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.refreshToken = null;

    await this.userRepository.save(user);
  }
}
