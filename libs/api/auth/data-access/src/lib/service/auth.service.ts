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
import { log } from 'util';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async register(registerDto: RegisterDto): Promise<void> {
    try {
      const refreshJwt = this.createJwt(registerDto, 8888);
      await this.userRepository.createUser(registerDto, refreshJwt);
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

    const accessJwt = this.createJwt(loginDto, 3600);
    const refreshJwt = this.createJwt(loginDto, 8888);
    const currentDate = new Date().getTime();

    const refreshTokenEntity = new RefreshTokenEntity();

    refreshTokenEntity.hashedRefreshToken = await hashWithSalt(refreshJwt);
    refreshTokenEntity.expiresAt = new Date(new Date().getTime() + 88888);
    refreshTokenEntity.createdAt = new Date();

    user.refreshToken = refreshTokenEntity;

    await this.userRepository.save(user);

    //  TODO: convert expires to injection token
    return { jwtToken: accessJwt, loggedInAt: currentDate, expiresAt: currentDate + 3600 };
  }

  private createJwt(loginDto: LoginDto, exp: number): string {
    const { username } = loginDto;
    const payload: JwtPayload = { username };

    return this.jwtService.sign(payload, { expiresIn: exp });
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

  public getCookieWithRefreshJwt(username: string) {
    const payload: JwtPayload = { username };
    const token = this.jwtService.sign(payload);

    return `Authentication=${token}; HttpOnly; Path=/auth/refresh-jwt; Max-Age=${3600}`;
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
}
