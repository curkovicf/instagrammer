import { Body, Controller, Post } from '@nestjs/common';
import {
  AuthService,
  RegisterDto,
  LoginDto,
  UsernameAvailabilityDto,
} from '@instagrammer/api/auth/data-access';
import {
  LoginResponseDto,
  UsernameAvailabilityResponseDto,
} from '@instagrammer/shared/data-access/api-dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  public async register(@Body() registerDto: RegisterDto): Promise<void> {
    return await this.authService.register(registerDto);
  }

  @Post('/check-username-availability')
  public async checkUsernameAvailability(
    @Body() usernameAvailabilityDto: UsernameAvailabilityDto,
  ): Promise<UsernameAvailabilityResponseDto> {
    return await this.authService.checkUsernameAvailability(usernameAvailabilityDto);
  }

  @Post('/login')
  public async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return await this.authService.login(loginDto);
  }
}
