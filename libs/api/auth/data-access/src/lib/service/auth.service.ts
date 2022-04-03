import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { UserRepository } from '../repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '@instagrammer/api/shared/data-access/interfaces';

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

  public async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { username, password, email } = loginDto;

    const user = await this.userRepository.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username };
    const accessToken: string = this.jwtService.sign(payload);

    return { accessToken };
  }
}
