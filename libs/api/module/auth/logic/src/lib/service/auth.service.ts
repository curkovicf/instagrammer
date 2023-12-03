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
import LoginResponseWrapperDto = UserApi.LoginResponseWrapperDto;

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
      const account = await this.accountRepository.createUser({
        ...signUpDto,
        password: await this.encryptionService.hash(signUpDto.password),
      });

      await this.userRepository.save({ dob: new Date(signUpDto.dob), fullName: signUpDto.fullName, account });
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
    const userAccount = await this.accountRepository.findOneByUsernameOrEmail(username ?? email);

    //  3. If not user throw exception
    if (!userAccount) {
      throw new NotFoundException(
        "The username you entered doesn't belong to an account. Please check your username and try again.",
      );
    }

    //  4. If invalid password, throw invalid password
    if (!(await this.encryptionService.compare(password, userAccount.password))) {
      throw new UnauthorizedException(
        'Sorry, your password was incorrect. Please double-check your password.',
      );
    }

    //  5. Generate access & refresh token pairs
    const { accessToken, refreshToken } = this.jwtAuthService.generateAuthTokenPair(isLongSession, username);

    //  6. Hash and store new refresh token to the DB
    userAccount.refreshToken = await this.encryptionService.hash(refreshToken);

    //  8. Save user with updated refresh token data
    await this.accountRepository.save(userAccount);

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

    user.refreshToken = undefined;

    await this.userRepository.save(user);
  }

  /**
   *
   * @param refreshToken
   */
  public isRefreshTokenValid(refreshToken: string): string | null {
    try {
      const { username } = this.jwtAuthService.isValid(refreshToken) as { username: string };

      return username;
    } catch (error) {
      return null;
    }
  }

  /**
   * Check refresh token validity & sign in user via refresh token
   *
   * @param refreshToken
   */
  public async signInViaRefreshToken(refreshToken: string): Promise<{
    username: string;
    accessToken: string;
  }> {
    const username: string | null = this.isRefreshTokenValid(refreshToken);

    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const account = await this.accountRepository.findOneByUsernameOrEmail(username);

    if (!account) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!account.refreshToken) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!(await this.encryptionService.compare(account.refreshToken, refreshToken))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.jwtAuthService.generateAccessToken(username);

    return {
      username,
      accessToken,
    };
  }

  /**
   *
   * @param refreshTokenFromCookie
   */
  public async signInLongSession(refreshTokenFromCookie: string): Promise<LoginResponseWrapperDto> {
    const { username } = this.jwtAuthService.decode(refreshTokenFromCookie) as { username: string };

    const account = await this.accountRepository.findOneByUsernameOrEmail(username);

    if (!account) {
      throw new NotFoundException('User not found');
    }

    //  1. Generate access & refresh token pairs
    const { accessToken, refreshToken } = this.jwtAuthService.generateAuthTokenPair(true, username);

    //  2. Hash and store new refresh token to the DB
    account.refreshToken = await this.encryptionService.hash(refreshToken);

    //  3. Save user with updated refresh token data
    await this.accountRepository.save(account);

    //  4. Map data and return needed results to the frontend part
    return {
      loginResponseDto: {
        username: username,
      },
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
