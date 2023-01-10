import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  MethodNotAllowedException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError } from 'typeorm';
import { BaseEncryptionService } from '@instagrammer/api/shared/util/encryption';
import { DecodedJwtDto } from '../dto/decoded-jwt.dto';
import { RefreshTokenRepository } from '../repository/refresh-token.repository';
import {
  JwtPairDto,
  LoginRequestDto,
  LoginResponseDto,
  LogoutRequestDto,
  RefreshJwtRequestDto,
  RegisterRequestDto,
  UsernameExistsRequestDto,
  UsernameExistsResponseDto,
} from '@instagrammer/shared-data-access-api-auth-dto';
import { JwtUtilService } from '../jwt/util/jwt-util.service';
import { JwtExpires } from '../jwt/util/jwt-expires.enum';
import { UserEntity } from '@instagrammer/api/core/entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
    @InjectRepository(RefreshTokenRepository) private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly jwtUtilService: JwtUtilService,
    private readonly encryptionService: BaseEncryptionService,
  ) {}

  /**
   * Attempts to create/register new user
   * @param registerDto
   */
  public async register(registerDto: RegisterRequestDto): Promise<void> {
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
   * Attempts to log-in/sign-in user
   * @param loginDto
   */
  public async login(
    loginDto: LoginRequestDto,
  ): Promise<{ loginResponseDto: LoginResponseDto; refreshToken: string }> {
    const { username, password, email } = loginDto;

    const user = await this.userRepository.findOneByUsernameOrEmail(username ?? email);

    if (!user) {
      throw new NotFoundException(
        "The username you entered doesn't belong to an account. Please check your username and try again.",
      );
    }

    if (!(await this.encryptionService.compare(password, user.password))) {
      throw new UnauthorizedException(
        'Sorry, your password was incorrect. Please double-check your password.',
      );
    }

    const { accessToken, refreshToken } = this.jwtUtilService.generateTokenPair(username, false);

    await this.deleteCurrentRefreshToken(user);

    user.refreshToken = await this.refreshTokenRepository.createNewRefreshTokenEntity({
      ...refreshToken,
      value: await this.encryptionService.hash(refreshToken.value),
    });

    await this.userRepository.save(user);

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
    usernameExistsDto: UsernameExistsRequestDto,
  ): Promise<UsernameExistsResponseDto> {
    const { username } = usernameExistsDto;
    const responseDto: UsernameExistsResponseDto = { username, isUsernameAvailable: false };

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
  async logout(logoutDto: LogoutRequestDto): Promise<void> {
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
  public async generateNewRefreshJwt(refreshJwtDto: RefreshJwtRequestDto): Promise<JwtPairDto> {
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

    user.refreshToken = await this.refreshTokenRepository.createNewRefreshTokenEntity({
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
  public async generateNewAccessToken(refreshJwt: string): Promise<LoginResponseDto> {
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
    await this.refreshTokenRepository.delete({ refreshTokenId });
  }
}
