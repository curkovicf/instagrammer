import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  MethodNotAllowedException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError } from 'typeorm';
import { BaseEncryptionService } from '@instagrammer/api/shared/util/encryption';
import { DecodedJwtDto, UserEntity, UserRepository } from '@instagrammer/api/module/user/data';
import { RefreshTokenService } from './refresh-token.service';
import { JwtUtilService } from './jwt-util.service';
import { JwtExpires } from '../interface/jwt-expires.enum';
import { UserApi } from '@instagrammer/shared/data/api';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtUtilService: JwtUtilService,
    private readonly encryptionService: BaseEncryptionService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  /**
   * Attempts to create/register new user
   * @param registerDto
   */
  public async signUp(registerDto: UserApi.RegisterRequestDto): Promise<void> {
    try {
      await this.userRepository.createUser({
        ...registerDto,
        password: await this.encryptionService.hash(registerDto.password),
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
   * Attempts to create/register new user
   * @param registerDto
   */
  public async signUpV2(registerDto: UserApi.RegisterRequestDto): Promise<UserApi.LoginResponseWrapperDto> {
    try {
      await this.userRepository.createUser({
        ...registerDto,
        password: await this.encryptionService.hash(registerDto.password),
      });

      return this.signInV2(registerDto);
    } catch (err) {
      if (err instanceof QueryFailedError && Number(err.driverError.code) === 23505) {
        throw new ConflictException('Username already taken');
      } else {
        throw new InternalServerErrorException('Error while creating a new user');
      }
    }
  }

  private someData: UserApi.LoginResponseWrapperDto;

  /**
   * Attempts to log-in/sign-in user
   * @param loginDto
   */
  public async signInV2(loginDto: UserApi.LoginRequestDto): Promise<UserApi.LoginResponseWrapperDto> {
    //  1. Extract data from DTO
    const { username, password, email, isLongSession } = loginDto;

    //  2. Find user via email or username
    const user = await this.userRepository.findOneByUsernameOrEmail(username ?? email);

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
    await this.deleteCurrentRefreshToken(user);

    //  7. Create new refresh token and attach it to the user
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
   * Attempts to log-in/sign-in user
   * @param loginDto
   */
  public async signIn(
    loginDto: UserApi.LoginRequestDto,
  ): Promise<{ loginResponseDto: UserApi.LoginResponseDtoV2; refreshToken: string }> {
    //  1. Extract data from DTO
    const { username, password, email, isLongSession } = loginDto;

    //  2. Find user via email or username
    const user = await this.userRepository.findOneByUsernameOrEmail(username ?? email);

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
    await this.deleteCurrentRefreshToken(user);

    //  7. Create new refresh token and attach it to the user
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
        jwt: accessToken.value,
        issuedAt: accessToken.issuedAt,
        expiresAt: accessToken.expiresAt,
      },
      refreshToken: refreshToken.value,
    };
  }

  /**
   * Checks if username is being used in the database
   * @param usernameExistsDto
   */
  public async checkIfUsernameExists(
    usernameExistsDto: UserApi.UsernameExistsRequestDto,
  ): Promise<UserApi.UsernameExistsResponseDto> {
    const { username } = usernameExistsDto;
    const responseDto: UserApi.UsernameExistsResponseDto = { username, isUsernameAvailable: false };

    const usernameExists = await this.userRepository.findOne({ where: { username } });

    if (usernameExists) {
      return responseDto;
    }

    responseDto.isUsernameAvailable = true;

    return responseDto;
  }

  /**
   * Sets new auth cookie header
   * @param refreshJwt
   */
  public createNewHttpHeaderWithCookie(refreshJwt: string): string {
    return `Authentication=${refreshJwt}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${
      new Date().getTime() +
      this.jwtUtilService.getJwtExpiryInMilliseconds(JwtExpires.REFRESH_JWT_EXPIRES_LONG)
    }`;
  }

  /**
   * Attempts to log-out user
   * @param logoutDto
   */
  async logout(logoutDto: UserApi.LogoutRequestDto): Promise<void> {
    const { usernameOrEmail } = logoutDto;

    const user = await this.userRepository.findOneByUsernameOrEmail(usernameOrEmail);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.refreshToken = null;

    await this.userRepository.save(user);
  }

  /**
   * Generates new refresh JWT based on session type
   * Session can be long(60 days) or short(2 days)
   * @param refreshJwtDto
   */
  public async generateNewRefreshJwt(
    refreshJwtDto: UserApi.RefreshJwtRequestDto,
  ): Promise<UserApi.JwtPairDto> {
    const { usernameOrEmail, isLongSession } = refreshJwtDto;

    const user = await this.userRepository.findOneByUsernameOrEmail(usernameOrEmail);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { accessToken, refreshToken } = this.jwtUtilService.generateTokenPair(
      usernameOrEmail,
      isLongSession,
    );

    await this.deleteCurrentRefreshToken(user);

    user.refreshToken = await this.refreshTokenService.createNewRefreshToken({
      ...refreshToken,
      value: await this.encryptionService.hash(refreshToken.value),
    });

    await this.userRepository.save(user);

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Generates new access token if refresh JWT from cookie is valid
   * @param refreshJwt
   */
  public async generateNewAccessToken(refreshJwt: string): Promise<UserApi.LoginResponseDto> {
    const decodedToken: DecodedJwtDto | null = this.jwtUtilService.decode(
      refreshJwt?.slice() ?? '',
    ) as DecodedJwtDto;

    if (!decodedToken) {
      throw new MethodNotAllowedException();
    }

    const user = await this.userRepository.findOne({ where: { username: decodedToken.username } });

    if (!user) {
      throw new NotFoundException();
    }

    if (!(await this.encryptionService.compare(refreshJwt, user.refreshToken?.hashedRefreshToken ?? ''))) {
      throw new UnauthorizedException();
    }

    const newToken = this.jwtUtilService.generateToken(decodedToken.username, JwtExpires.ACCESS_JWT);

    return {
      jwt: newToken.value,
      issuedAt: newToken.issuedAt,
      expiresAt: newToken.expiresAt,
      username: decodedToken.username,
    };
  }

  /**
   * Deletes current refresh token from the user
   * @param userEntity
   * @private
   */
  private async deleteCurrentRefreshToken(userEntity: UserEntity): Promise<void> {
    if (!userEntity?.refreshToken) {
      return;
    }

    const { refreshTokenId } = userEntity.refreshToken;

    userEntity.refreshToken = null;

    await this.userRepository.save(userEntity);
    await this.refreshTokenService.delete(refreshTokenId);
  }
}
