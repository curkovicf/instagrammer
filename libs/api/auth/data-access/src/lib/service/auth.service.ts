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
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '@instagrammer/api/shared/data-access/interfaces';
import { LoginResponseDto, UsernameExistsResponseDto } from '@instagrammer/shared/data-access/api-dtos';
import { UsernameExistsDto } from '../dto/username-exists.dto';
import { compare, hashWithSalt } from '@instagrammer/api/shared/util/encryption';
import { RefreshTokenEntity } from '../entity/refresh-token.entity';
import { LogoutDto } from '../dto/logout.dto';
import { RefreshJwtDto } from '../dto/refresh-jwt.dto';
import { JwtTokenDto, TokenPairDto } from '../dto/token-pair.dto';
import { getJwtExpiryInMilliseconds, JwtExpiresStr } from '../constants';
import { DecodedJwtDto } from '../dto/decoded-jwt.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

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

  public async login(loginDto: LoginDto): Promise<{ loginResponseDto: LoginResponseDto; refreshToken: string }> {
    const { username, password, email } = loginDto;

    const user = await this.userRepository.findOne({ username });

    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { accessToken, refreshToken } = this.generateTokenPair(username, false);

    user.refreshToken = null;
    await this.userRepository.save(user);

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

  private createJwt(username: string, jwtExpires: JwtExpiresStr): string {
    const payload: JwtPayload = { username };

    return this.jwtService.sign(payload, { expiresIn: jwtExpires });
  }

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

  public createNewHttpHeaderWithCookie(refreshJwt: string): string {
    // Path=/auth/refresh-jwt
    return `Authentication=${refreshJwt}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${
      new Date().getTime() + getJwtExpiryInMilliseconds(JwtExpiresStr.REFRESH_JWT_EXPIRES_LONG)
    }`;
  }

  async logout(logoutDto: LogoutDto): Promise<void> {
    const { username } = logoutDto;

    const user = await this.userRepository.findOne({ username });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.refreshToken = null;

    await this.userRepository.save(user);
  }

  public async generateNewRefreshJwt(refreshJwtDto: RefreshJwtDto): Promise<TokenPairDto> {
    const { username, isLongSession } = refreshJwtDto;

    const user = await this.userRepository.findOne({ username });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { accessToken, refreshToken } = this.generateTokenPair(username, isLongSession);

    user.refreshToken = null;
    await this.userRepository.save(user);

    user.refreshToken = await this.createNewRefreshTokenEntity(refreshToken);

    await this.userRepository.save(user);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async createNewRefreshTokenEntity(refreshToken: JwtTokenDto): Promise<RefreshTokenEntity> {
    const refreshTokenEntity = new RefreshTokenEntity();

    refreshTokenEntity.hashedRefreshToken = await hashWithSalt(refreshToken.value);
    refreshTokenEntity.issuedAt = new Date(refreshToken.issuedAt);
    refreshTokenEntity.expiresAt = new Date(refreshToken.expiresAt);

    return refreshTokenEntity;
  }

  private generateTokenPair(username: string, isLongSession: boolean): TokenPairDto {
    const accessToken: JwtTokenDto = this.generateToken(username, JwtExpiresStr.ACCESS_JWT);

    const refreshTokenExpires = isLongSession ? JwtExpiresStr.REFRESH_JWT_EXPIRES_LONG : JwtExpiresStr.REFRESH_JWT_EXPIRES_SHORT;
    const refreshToken: JwtTokenDto = this.generateToken(username, refreshTokenExpires);

    return {
      accessToken,
      refreshToken,
    };
  }

  private generateToken(username: string, jwtExpiresStr: JwtExpiresStr): JwtTokenDto {
    return {
      value: this.createJwt(username, jwtExpiresStr),
      expiresAt: new Date().getTime() + getJwtExpiryInMilliseconds(jwtExpiresStr),
      issuedAt: new Date().getTime(),
    };
  }

  public async generateNewAccessToken(refreshJwt: string): Promise<JwtTokenDto> {
    const decodedToken: DecodedJwtDto | null = this.jwtService.decode(refreshJwt) as DecodedJwtDto;

    if (!decodedToken) {
      throw new MethodNotAllowedException();
    }

    const user = await this.userRepository.findOne({ username: decodedToken.username });

    if (!user) {
      throw new NotFoundException();
    }

    if (!(await compare(user.refreshToken?.hashedRefreshToken ?? '', await hashWithSalt(refreshJwt)))) {
      throw new UnauthorizedException();
    }

    return this.generateToken(decodedToken.username, JwtExpiresStr.ACCESS_JWT);
  }
}
