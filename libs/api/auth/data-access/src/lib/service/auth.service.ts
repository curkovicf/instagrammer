import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
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
import {
  LoginResponseDto,
  UsernameExistsResponseDto,
} from '@instagrammer/shared/data-access/api-dtos';
import { UsernameExistsDto } from '../dto/username-exists.dto';
import { compare, hashWithSalt } from '@instagrammer/api/shared/util/encryption';
import { RefreshTokenEntity } from '../entity/refresh-token.entity';
import { LogoutDto } from '../dto/logout.dto';
import { RefreshJwtDto } from '../dto/refresh-jwt.dto';

@Injectable()
export class AuthService {
  private readonly accessJwtExpires = 60 * 10;
  private readonly refreshJwtExpiresLong = 60 * 60 * 24 * 60;
  private readonly refreshJwtExpiresShort = 60 * 60 * 24;

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

  public async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { username, password, email } = loginDto;

    const user = await this.userRepository.findOne({ username });

    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessJwt = this.createJwt(username, this.accessJwtExpires);
    const refreshJwt = this.createJwt(username, this.refreshJwtExpiresLong);
    const currentDate = new Date().getTime();

    const refreshTokenEntity = new RefreshTokenEntity();

    refreshTokenEntity.hashedRefreshToken = await hashWithSalt(refreshJwt);
    refreshTokenEntity.expiresAt = new Date(new Date().getTime() + this.refreshJwtExpiresLong);
    refreshTokenEntity.createdAt = new Date();

    user.refreshToken = refreshTokenEntity;

    await this.userRepository.save(user);

    //  TODO: convert expires to injection token
    return {
      jwtToken: accessJwt,
      loggedInAt: currentDate,
      expiresAt: currentDate + this.accessJwtExpires,
    };
  }

  private createJwt(username: string, expiresIn: number): string {
    const payload: JwtPayload = { username };

    return this.jwtService.sign(payload, { expiresIn });
  }

  public async checkIfUsernameExists(
    usernameExistsDto: UsernameExistsDto,
  ): Promise<UsernameExistsResponseDto> {
    const { username } = usernameExistsDto;
    const responseDto: UsernameExistsResponseDto = { username, isUsernameAvailable: false };

    const usernameExists = await this.userRepository.findOne({ username });

    if (usernameExists) {
      return responseDto;
    }

    responseDto.isUsernameAvailable = true;

    return responseDto;
  }

  public async createNewCookieWithRefreshJwt(refreshJwt: string): Promise<string> {
    // Path=/auth/refresh-jwt
    return `Authentication=${refreshJwt}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${
      new Date().getTime() + this.refreshJwtExpiresLong
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

  public async generateNewRefreshJwt(refreshJwtDto: RefreshJwtDto): Promise<string> {
    const { username, isLongSession } = refreshJwtDto;

    const user = await this.userRepository.findOne({ username });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newToken = this.createJwt(
      username,
      isLongSession ? this.refreshJwtExpiresLong : this.refreshJwtExpiresShort,
    );
    const refreshTokenEntity = new RefreshTokenEntity();

    refreshTokenEntity.hashedRefreshToken = await hashWithSalt(newToken);
    refreshTokenEntity.createdAt = new Date();
    refreshTokenEntity.expiresAt = new Date(
      new Date().getTime() +
        (isLongSession ? this.refreshJwtExpiresLong : this.refreshJwtExpiresShort),
    );

    user.refreshToken = refreshTokenEntity;

    await this.userRepository.save(user);

    return refreshTokenEntity.hashedRefreshToken;
  }
}
