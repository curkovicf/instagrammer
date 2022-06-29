import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  MethodNotAllowedException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { UserRepository } from '../repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError } from 'typeorm';
import { LoginResponseDto, UsernameExistsResponseDto } from '@instagrammer/shared/data-access/api-dtos';
import { UsernameExistsDto } from '../dto/username-exists.dto';
import { BaseEncryptionService } from '@instagrammer/api/shared/util/encryption';
import { RefreshTokenEntity } from '../entity/refresh-token.entity';
import { LogoutDto } from '../dto/logout.dto';
import { RefreshJwtDto } from '../dto/refresh-jwt.dto';
import { JwtTokenDto, TokenPairDto } from '../dto/token-pair.dto';
import { getJwtExpiryInMilliseconds, JwtExpiresStr } from '../jwt/constants';
import { DecodedJwtDto } from '../dto/decoded-jwt.dto';
import { RefreshTokenRepository } from '../repository/refresh-token.repository';
import { UserEntity } from '../entity/user.entity';
import { JwtUtilService } from '../jwt/jwt-util.service';

@Injectable()
export class AuthService {
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
  public async register(registerDto: RegisterDto): Promise<void> {
    try {
      await this.userRepository.createUser(registerDto);
    } catch (err) {
      console.log(err);
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
  public async login(loginDto: LoginDto): Promise<{ loginResponseDto: LoginResponseDto; refreshToken: string }> {
    const { username, password } = loginDto;

    const user = await this.userRepository.findOne({ username });

    if (!user || !(await this.encryptionService.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { accessToken, refreshToken } = this.jwtUtilService.generateTokenPair(username, false);

    await this.deleteCurrentRefreshToken(user);

    user.refreshToken = await this.createNewRefreshTokenEntity(refreshToken);

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
  public async checkIfUsernameExists(usernameExistsDto: UsernameExistsDto): Promise<UsernameExistsResponseDto> {
    const { username } = usernameExistsDto;
    const responseDto: UsernameExistsResponseDto = { username, isUsernameAvailable: false };

    const usernameExists = await this.userRepository.findOne({ username });

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
    return `Authentication=${refreshJwt}; HttpOnly; Path=/auth; SameSite=Strict; Max-Age=${
      new Date().getTime() + getJwtExpiryInMilliseconds(JwtExpiresStr.REFRESH_JWT_EXPIRES_LONG)
    }`;
  }

  /**
   * Attempts to log-out user
   * @param logoutDto
   */
  async logout(logoutDto: LogoutDto): Promise<void> {
    const { username } = logoutDto;

    const user = await this.userRepository.findOne({ username });

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
  public async generateNewRefreshJwt(refreshJwtDto: RefreshJwtDto): Promise<TokenPairDto> {
    const { username, isLongSession } = refreshJwtDto;

    const user = await this.userRepository.findOne({ username });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { accessToken, refreshToken } = this.jwtUtilService.generateTokenPair(username, isLongSession);

    await this.deleteCurrentRefreshToken(user);

    user.refreshToken = await this.createNewRefreshTokenEntity(refreshToken);

    await this.userRepository.save(user);

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Creates new refresh token entity
   * @param refreshToken
   * @private
   */
  private async createNewRefreshTokenEntity(refreshToken: JwtTokenDto): Promise<RefreshTokenEntity> {
    const refreshTokenEntity = new RefreshTokenEntity();

    refreshTokenEntity.hashedRefreshToken = await this.encryptionService.hash(refreshToken.value);
    refreshTokenEntity.issuedAt = new Date(refreshToken.issuedAt);
    refreshTokenEntity.expiresAt = new Date(refreshToken.expiresAt);

    return refreshTokenEntity;
  }

  /**
   * Generates new access token if refresh JWT from cookie is valid
   * @param refreshJwt
   */
  public async generateNewAccessToken(refreshJwt: string): Promise<LoginResponseDto> {
    const decodedToken: DecodedJwtDto | null = this.jwtUtilService.decode(refreshJwt.slice()) as DecodedJwtDto;

    if (!decodedToken) {
      throw new MethodNotAllowedException();
    }

    const user = await this.userRepository.findOne({ username: decodedToken.username });

    if (!user) {
      throw new NotFoundException();
    }

    if (!(await this.encryptionService.compare(refreshJwt, user.refreshToken?.hashedRefreshToken ?? ''))) {
      throw new UnauthorizedException();
    }

    const newToken = this.jwtUtilService.generateToken(decodedToken.username, JwtExpiresStr.ACCESS_JWT);

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
