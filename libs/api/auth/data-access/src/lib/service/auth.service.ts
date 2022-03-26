import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  public async register(registerDto: RegisterDto) {}

  public async login(loginDto: LoginDto) {}
}
