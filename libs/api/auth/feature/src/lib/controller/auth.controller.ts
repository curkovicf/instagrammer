import { Body, Controller, Post } from '@nestjs/common';
import {
  AuthService,
  RegisterDto,
  LoginDto,
  UsernameExistsDto,
} from '@instagrammer/api/auth/data-access';
import {
  LoginResponseDto,
  UsernameExistsResponseDto,
} from '@instagrammer/shared/data-access/api-dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  public async register(@Body() registerDto: RegisterDto): Promise<void> {
    return await this.authService.register(registerDto);
  }

  @Post('/username-exists')
  public async checkUsernameExists(
    @Body() usernameExistsDto: UsernameExistsDto,
  ): Promise<UsernameExistsResponseDto> {
    return await this.authService.checkIfUsernameExists(usernameExistsDto);
  }

  @Post('/login')
  public async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return await this.authService.login(loginDto);
  }
}
