import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { UserRepository } from '../repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '@instagrammer/api/shared/data-access/interfaces';
import {
  LoginResponseDto,
  UsernameExistsResponseDto,
} from '@instagrammer/shared/data-access/api-dtos';
import { UsernameExistsDto } from '../dto/username-exists.dto';

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

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const expireDuration = 3600;
    const payload: JwtPayload = { username };
    const jwtToken: string = this.jwtService.sign(payload);
    const currentDate = new Date().getTime();

    //  TODO: convert expires to injection token
    return { jwtToken, loggedInAt: currentDate, expiresAt: currentDate + expireDuration };
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
}
