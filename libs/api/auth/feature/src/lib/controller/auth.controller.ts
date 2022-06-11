import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import {
  AuthService,
  RegisterDto,
  LoginDto,
  UsernameExistsDto,
  LogoutDto,
  RefreshJwtDto,
} from '@instagrammer/api/auth/data-access';
import { JwtResponseDto, UsernameExistsResponseDto } from '@instagrammer/shared/data-access/api-dtos';
import { Request, Response } from 'express';
import { JwtTokenDto } from '../../../../data-access/src/lib/dto/token-pair.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  public async register(@Body() registerDto: RegisterDto): Promise<void> {
    return await this.authService.register(registerDto);
  }

  @Post('/username-exists')
  public async checkUsernameExists(@Body() usernameExistsDto: UsernameExistsDto): Promise<UsernameExistsResponseDto> {
    return await this.authService.checkIfUsernameExists(usernameExistsDto);
  }

  @Post('/login')
  public async login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() loginDto: LoginDto,
  ): Promise<JwtResponseDto> {
    const { loginResponseDto, refreshToken } = await this.authService.login(loginDto);
    const newCookie = this.authService.createNewHttpHeaderWithCookie(refreshToken);

    res.setHeader('Set-Cookie', newCookie);

    return loginResponseDto;
  }

  @Post('/refresh-jwt')
  public async refreshJwt(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() refreshJwtDto: RefreshJwtDto,
  ): Promise<JwtTokenDto> {
    const { accessToken, refreshToken } = await this.authService.generateNewRefreshJwt(refreshJwtDto);
    const newCookie = this.authService.createNewHttpHeaderWithCookie(refreshToken.value);

    res.setHeader('Set-Cookie', newCookie);

    return accessToken;
  }

  @Post('/logout')
  public async logout(@Body() logoutDto: LogoutDto): Promise<void> {
    return await this.authService.logout(logoutDto);
  }
}
